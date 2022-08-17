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
//CANT HANDLE NULL INPUT
function getCommodityBySymbol(symbol, currency, date) {
  var access_key =
    //"ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971"; // vian's key
    "5j9z3tm51x3q548swpzl0chbh4o5html88lm1htqpcbmdkwtgzl7f5boy4r2"; // raymond's key
  var base = "&base=" + symbol;
  var symbols = "&symbols=" + currency;
  let dtz = fetch("https://commodities-api.com/api/open-high-low-close/" +
        date +
        "?access_key=" +
        access_key +
        base +
        symbols)
  .then(function(request){
    return request.json();
    })
  .then( function(request){
    console.log('high', request.rates.high);
    console.log('close',request.rates.close);
    console.log('low',request.rates.low);
    console.log('open',request.rates.open);
    return request.rates;
    })
    console.log('dtz:',dtz);
}

let stringTooSymbol = {
  gold: "GBP",
  oil: "BRENTOIL",
  crude: "BRENTOIL",
  silver: "XAG",
  wheat: "WHEAT",
  corn: "CORN",
};

$("#fetch-button").on("click", function (event) {
  let dropDown = $("#dropDownTxt");
  let commSelect = $(dropDown[0]).text();
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
  getCommodityBySymbol(stringTooSymbol[commSelect], currency, todayString);
});

function newsApi() {
  var q = "Apple";
  var from = "2022-08-17";
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
newsApi();

//test api launch on production on github
