// This will look at the rates of and display them in boxes.
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

//Modified to take date object as a param, formats in function
// This get a commodity based: SYM,   USD,  YYYY-MM-DD, forChart
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
      // Here we looking at current date vs date pulled.
      if(date.getFullYear() === todayDate.getFullYear() &&
        date.getMonth() === todayDate.getMonth() &&
        date.getDate() === todayDate.getDate()){
        displayCurrentPrice(request.rates);
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


// When the fetch button is clicked, it will look at dropdown Text and start the search.
$("#fetch-button").on("click", function (event) {
  let dropDown = $("#dropDownTxt");
  // Here we might want to start loading icon.


  fetchInformation($(dropDown[0]).text())
});

// This is to add event listener to the fast buttons to fetchInfo.
let fastBtn = $('#StoredButtons');
fastBtn.on('click',function(event){
  let dropDown = $(event.target);
  fetchInformation(dropDown.attr('data-comm'));
  console.log("fastbutton pressed");
});

// This is after a button press, either one of the fast buttons or fetch-buttons
// This will start the api calls and buildng charts when ready.
function fetchInformation(commSelect){
  $('#showCommHeader').text(commSelect);
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
      offsetDate(-1 * i),
      chart
    );
  }
  chart.buildChartWhenReady(); 
  // newsApi(commSelect, todayString);

  // Here will will add it to local storage for future button showing. 
  addCommTooLocalStorage(commSelect);
  doFastButtons();
}




// This function is created to saved to local storage.
function addCommTooLocalStorage(comm){
  if(comm === '\n              Select Commodity\n            ' || comm == null) return;
  var lastGrade = JSON.parse(localStorage.getItem("BList!"));
  if(lastGrade === null){
    lastGrade = [];
    console.log("New local Storage Created");
  }
  if(lastGrade.includes(comm)){
//    console.log('Shoud Not add');
  } else {
    lastGrade.push(comm);
  }
  localStorage.setItem('BList!',JSON.stringify(lastGrade));
}

function offsetDate(numDayOffset) {
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
