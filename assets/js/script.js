var data = document.querySelector("data");
var fetchButton = document.getElementById("fetch-button");

//original function to test API
// function getApi() {
//   // Insert the API url to get a list of your repos
//   var requestUrl =
//     "https://commodities-api.com/api/latest?access_key=ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971";

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log(data.data.base);
//     });
// }

var data = [];

var onClickEvent = async (event) => {
  data = [];
  //var onClickEvent same as function OnclickEvent except can add async and await in body
  var myDates = [
    "2022-08-09",
    "2022-08-10",
    "2022-08-11",
    "2022-08-12",
    "2022-08-15",
  ];
  for (let i = 0; i < myDates.length; i++) {
    const currentDate = myDates[i];
    var res = await getSpecificApi(currentDate);
    data.push(res);
  }
  console.log("this should be at end of async stack");
};

var getSpecificApi = async (endpoint) => {
  var access_key =
    "ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971";
  var base = "&base=XAU";
  var symbols = "&symbols=USD";

  //querySelector here outside
  //   ,GBP,BRENTOIL,XAG,WHEAT,CORN

  var result = await $.ajax({
    url:
      "https://commodities-api.com/api/open-high-low-close/" +
      endpoint +
      "?access_key=" +
      access_key +
      base +
      symbols,

    dataType: "json",
  });
  console.log(result);
  return result;
};
// fetchButton.addEventListener("click", getSpecificApi);
fetchButton.addEventListener("click", onClickEvent);
