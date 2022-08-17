var data = document.querySelector("data");
var fetchButton = document.getElementById("fetch-button");

function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl =
    "https://commodities-api.com/api/latest?access_key=ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.data.base);
    });
}
function next(data) {
  console.log("i am in the next function");
  var tempData = { ...data };
  tempData.test = "this is my test";
  return tempData;
}


function displayCurrentPrice(rates){
  let baseEl = $('#currentPrice');

  // If we are updating price
  // we need to remove all the old elements shown.
  let dtz = $('.priceCard');
  dtz.remove();

  for(let i in rates){
    let priceEl = $('<div>');
    let priceHeader = $('<h1>')
    priceHeader.text(i)
    let thePrice = $('<p>');
    thePrice.text(rates[i]);
    priceEl.attr('class', 'm-2 text-light bg-dark priceCard')
    priceEl.append(priceHeader);
    priceEl.append(thePrice);
    baseEl.append(priceEl);
  }
}

let currentPrice;

//Modified to take date object as a param, formats in function
function getCommodityBySymbol(symbol, currency, date, forChart) {
  //CANT HANDLE NULL INPUT
  // c2d7493df4aabdeb7d5738fcbde8f28250fc0b69
  var access_key =
    //"ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971"; // vian's key
    "5j9z3tm51x3q548swpzl0chbh4o5html88lm1htqpcbmdkwtgzl7f5boy4r2"; // raymond's key
  var base = "&base=" + symbol;
  var symbols = "&symbols=" + currency;
  let todayDate = new Date(); // Variable holding today's date to see in request if it hits to update.

  let dateString =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  fetch(
    "https://commodities-api.com/api/open-high-low-close/" +
      dateString +
      "?access_key=" +
      access_key +
      base +
      symbols
  )
    .then(function (request) {
      return request.json();
    })
    .then(function (request) {
      console.log("high", request.rates.high);
      console.log("close", request.rates.close);
      console.log("low", request.rates.low);
      console.log("open", request.rates.open);
      if(date.getFullYear() === todayDate.getFullYear() &&
        date.getMonth() === todayDate.getMonth() &&
        date.getDate() === todayDate.getDate()){
        displayCurrentPrice(request.rates)
        // Sorry guys this is where the price gets updated.
      }
      forChart.addCandle(
        new Candle(
          date,
          request.rates.open,
          request.rates.low,
          request.rates.high,
          request.rates.close
        )
      );
      return request.rates;
    });
}
/*
let stringTooSymbol = {
  gold: "GBP",
  oil: "BRENTOIL",
  crude: "BRENTOIL",
  silver: "XAG",
  wheat: "WHEAT",
  corn: "CORN"
};*/
$("#fetch-button").on("click", function (event) {
  let dropDown = $("#dropDownTxt");
  fetchInformation($(dropDown[0]).text())
  
});

function fetchInformation(commSelect){
  let currency = "USD";
  let today = new Date();
  let todayString =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  console.log(
    "Fetching " + commSelect,
    "SYM : " + stringTooSymbol[commSelect],
    " Currency: ",
    currency
  );
  var chart = new CandleChartData(
    7,
    stringTooSymbol[commSelect],
    todayString,
    []
  );
  for (var i = 0; i < chart.bins; i++) {
    getCommodityBySymbol(
      stringTooSymbol[commSelect],
      currency,
      getStringOfOffsetDate(-1 * i),
      chart
    );
  }
  chart.buildChartWhenReady(); 
  // newsApi(commSelect, todayString);

  // Here will will add it to local storage for future button showing. 
  addCommTooLocalStorage(commSelect);
}

let fastBtn = $('#StoredButtons');
fastBtn.on('click',function(event){
  let dropDown = $(event.target);
  fetchInformation(dropDown.attr('data-comm'));
  console.log("fastbutton pressed",);
});

function addCommTooLocalStorage(comm){
  if(comm === '\n              Select Commodity\n            ') return;
  var lastGrade = JSON.parse(localStorage.getItem("BList!"));
  if(lastGrade === null){
    lastGrade = [];
    console.log("CLEARS");
  }
  if(lastGrade.includes(comm)){
//    console.log('Shoud Not add');
  } else {
    lastGrade.push(comm);
  }
  localStorage.setItem('BList!',JSON.stringify(lastGrade));
}

function getStringOfOffsetDate(numDayOffset) {
  let dateToString = new Date();
  dateToString.setDate(dateToString.getDate() + numDayOffset);
  return dateToString;
}
function newsApi(q, from) {
  var sortBy = "popularity";
  var apiKey = "84fd76baf80f4e8db2bfd017809af1fc";
  var requestUrl = `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&apiKey=${apiKey}`;
  // console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.articles);
    });
}
