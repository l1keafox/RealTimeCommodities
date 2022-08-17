
var data = document.querySelector("data");
var fetchButton = document.getElementById("fetch-button");

google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);




function getCommodityBySymbol(symbol, currency, date ) {
  var access_key =
    //"ljdbuf72k16ob3i9jqscexucnfazsxi7l4deffx4d8w9ws8iyx7y0f2vp971"; // vian's key
      "5j9z3tm51x3q548swpzl0chbh4o5html88lm1htqpcbmdkwtgzl7f5boy4r2"; // raymond's key
  var base = "&base="+symbol;
  var symbols = "&symbols=" + currency;
  fetch("https://commodities-api.com/api/open-high-low-close/" +
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

}

let stringTooSymbol = {
  'gold': 'GBP',
  'oil': 'BRENTOIL',
  'crude': 'BRENTOIL',
  'silver': 'XAG',
  'wheat': 'WHEAT',
  'corn': 'CORN'
}

$('#fetch-button').on('click',function(event){
  let dropDown = $('#dropDownTxt');
  let commSelect= $(dropDown[0]).text();
  let currency = "USD";
  let today = new Date();
  let todayString = today.getFullYear()+ '-' + today.getMonth() +'-'+today.getDate();
  console.log("Fetching "+commSelect ,"SYM : " + stringTooSymbol[commSelect] ," Currency: ",currency );
  getCommodityBySymbol(stringTooSymbol[commSelect],currency, todayString);
  drawChart();
});


//draws a chart using the provided parameters.
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 77, 77, 66, 50],
    ['Fri', 68, 66, 22, 15]
    // Treat first row as data as well.
  ], true);

  var options = {
    legend:'none'
  };

  var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}

//class to describe entire chart, should perhaps be integrated with Vian's api calls directly, or alternatively will be built out to take whatever data she fetches as a param.
class candleChartData{
  constructor(bins,symbol,startDate,){
      this.bins=bins;
      this.symbol=symbol;
      this.startDate=startDate;
  }
}