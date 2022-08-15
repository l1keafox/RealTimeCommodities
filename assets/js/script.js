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

      // looping over the fetch response and inserting the URL of your repos into a list
      for (var i = 0; i < data.length; i++) {
        //Create a list element
        var listItem = document.createElement("li");

        //Set the text of the list element to the JSON response's .html_url property
        listItem.textContent = data[i].data.base;

        //Append the li element to the id associated with the ul element.
        data.appendChild(listItem);
      }
    });
}

// function getAccess() {
//   var endpoint = "latest";
//   var access_key =
//     "ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971";

//   $.ajax({
//     url:
//       "https://commodities-api.com/api/" +
//       endpoint +
//       "?access_key=" +
//       access_key,
//     dataType: "jsonp",
//     success: function (json) {
//       // exchange rata data is stored in json.rates
//       alert(json.rates.GBP);

//       // base currency is stored in json.base
//       alert(json.base);

//       // timestamp can be accessed in json.timestamp
//       alert(json.timestamp);
//     },
//   });
// }

// $(document).ready(function () {
//   fetchButton.addEventListener("click", getAccess);
// });

fetchButton.addEventListener("click", getApi);
