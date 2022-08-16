
var data = document.querySelector("data");
var fetchButton = document.getElementById("fetch-button");

google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Mon', 28, 28, 38, 38],
          ['Tue', 38, 38, 55, 55],
          ['Wed', 55, 55, 77, 77],
          ['Thu', 77, 77, 66, 66],
          ['Fri', 66, 66, 22, 22]
          // Treat the first row as data.
        ], true);

        var options = {
          legend: 'none',
          bar: { groupWidth: '100%' }, // Remove space between bars.
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
          }
        };

        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

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

function getSpecificApi() {
    // set endpoint and your access key
    var endpoint = "2022-08-15"; //querySelector outside function
    var access_key =
      "ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971";
    var base = "&base=XAU";
    var symbols = "&symbols=USD";
    //querySelector here outside
    //   ,GBP,BRENTOIL,XAG,WHEAT,CORN
    // get the most recent exchange rates via the “latest” endpoint:
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

  
  //A class describing a single candlestick.
class timeframeSnapshot{
  constructor(date,high,open,close,low){
      this.date=date;
      this.open=open;
      this.close=close;
      this.low=low;
  }
  returnArray(){
      return [this.low,this.open,this.close,this.high];
  }
}

//class to describe entire chart, should perhaps be integrated with Vian's api calls directly, or alternatively will be built out to take whatever data she fetches as a param.
class candleChartData{
  constructor(bins,symbol,startDate,){
      this.bins=bins;
      this.symbol=symbol;
      this.startDate=startDate;
  }
}