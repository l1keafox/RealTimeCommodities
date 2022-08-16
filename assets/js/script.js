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

function getSpecificApi(endpoint, usa) {
  // set endpoint and your access key
  var endpoint = "2022-08-15"; //querySelector outside function
  var access_key =
    "ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971";
  var base = "&base=XAU";
  var symbols = "&symbols=" + requestedSymbol;
  var requestedSymbol = "USD"; //querySelector here outside
  //   ,GBP,BRENTOIL,XAG,WHEAT,CORN
  // get the most recent exchange rates via the "latest" endpoint:
  $.ajax({
    url:
      "https://commodities-api.com/api/open-high-low-close/" +
      endpoint +
      "?access_key=" +
      access_key +
      base +
      symbols,

    dataType: "json",
    success: function (json) {
      // exchange rata data is stored in json.rates
      console.log(json);
      //   alert(json.rates.GBP);

      //   // base currency is stored in json.base
      //   alert(json.base);

      //   // timestamp can be accessed in json.timestamp
      //   alert(json.timestamp);
    },
  });
}
fetchButton.addEventListener("click", getSpecificApi);
