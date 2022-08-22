// This will look at the rates of and display them in boxes.
function displayCurrentPrice(rates) {
  let baseEl = $("#currentPrice");


  for (let i in rates) {
    let priceEl = $("<div>");
    let priceHeader = $("<h1>");
    priceHeader.text(i);
    let thePrice = $("<p>");
    thePrice.text(rates[i].toFixed(3));
    priceEl.attr("class", "m-2 priceCard");
    priceEl.append(priceHeader);
    priceEl.append(thePrice);
    baseEl.append(priceEl);
  }
}

// Call this function when you either:
// A. press a button to show new elements
// B. When quick button is pressed.
function removeOldElements(){
  $(".priceCard").remove();// OPEN/close/high/low numbers
  $(".card").remove(); // Removes news articles.
}

//Modified to take date object as a param, formats in function
// This get a commodity based: SYM,   USD,  YYYY-MM-DD, forChart
function getCommodityBySymbol(symbol, currency, date, forChart) {
  //CANT HANDLE NULL INPUT
  var access_key =
    //"ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971"; // vian's key
    "9hva9sagh62qb3fpu398otec0d2id5feemssw2t9vd7a61l4pcnwgtkhk4uz"; //James' key
    //"5j9z3tm51x3q548swpzl0chbh4o5html88lm1htqpcbmdkwtgzl7f5boy4r2"; // raymond's key
  if (!symbol) {
    return;
  }
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
      if (
        date.getFullYear() === todayDate.getFullYear() &&
        date.getMonth() === todayDate.getMonth() &&
        date.getDate() === todayDate.getDate()
      ) {
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
  removeOldElements(); // This removes elements from a previous button click
  fetchInformation($(dropDown[0]).text());
});

// This is to add event listener to the fast buttons to fetchInfo.
let fastBtn = $("#StoredButtons");
fastBtn.on("click", function (event) {
  let dropDown = $(event.target);
  removeOldElements(); // This removes elements from a previous button click
  fetchInformation(dropDown.attr("data-comm"));
  console.log("fastbutton pressed");
});

// This is after a button press, either one of the fast buttons or fetch-buttons
// This will start the api calls and buildng charts when ready.
function fetchInformation(commSelect) {
  $("#showCommHeader").text(commSelect + "    TICKER:" + stringTooSymbol[commSelect]);
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
    2,
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
  newsApi2(stringTooSymbol[commSelect], todayString);

  // Here will will add it to local storage for future button showing.
  addCommTooLocalStorage(commSelect);
  doFastButtons();
}

// This function is created to saved to local storage.
function addCommTooLocalStorage(comm) {
  if (comm === "\n              Select Commodity\n            " || comm == null || comm == undefined)
    return;
  var lastGrade = JSON.parse(localStorage.getItem("BList!"));
  if (lastGrade === null) {
    lastGrade = [];
    console.log("New local Storage Created");
  }
  if (lastGrade.includes(comm)) {
    //    console.log('Shoud Not add');
  } else {
    lastGrade.push(comm);
  }
  localStorage.setItem("BList!", JSON.stringify(lastGrade));
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

function newsApi2(q, from) {
  var requestUrl =
    "https://newsdata.io/api/1/news?apikey=pub_10359c215f1fbd7f82f4a4f4b9c12d34b5bda&q=" +
    q +
    "&language=en";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);
      let array = data.results;
      var article = $("#news");
      for (let index = 0; index < 3; index++) {
        const newsData = array[index];

        // console.log(newsData.title);
        // console.log(news);
        var newsEl = $("<div class=wrap>");
        newsEl.attr("class", "card");
        var imageEl = $("<img>");
        imageEl.attr("class", "card-img-top");
        // if no image is found, fill it with Bitcoin Pic
        if (newsData.image_url == null) {
          imageEl.attr(
            "src",
            "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/pexels-pixabay-315788-scaled.jpg"
          );
        } else {
          // if image_url exist, then we're giving the newsData a source
          imageEl.attr("src", newsData.image_url);
        }
        newsEl.attr("style", "width: 18rem");
        newsEl.append(imageEl);
        var titleEl = $("<h5>");
        titleEl.attr("class", "card-title");
        titleEl.text(newsData.title);
        newsEl.append(titleEl);

        var textEL = $("<p>");
        textEL.attr("class", "card-text");
        textEL.text(newsData.description);
        newsEl.append(textEL);

        var buttonEl = $("<a>");
        buttonEl.attr("class", "btn btn-primary");
        buttonEl.attr("href", newsData.link);
        buttonEl.text("Link");
        newsEl.append(buttonEl);

        // console.log(newsEl);
        article.append(newsEl);
      }

      /* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */

      // description;
      // link;
      // pubDate;
      // image_url;
      // video_url;
      // title;
    })
    .catch(function (data) {
      console.log("Fail,", data);
    });
}
