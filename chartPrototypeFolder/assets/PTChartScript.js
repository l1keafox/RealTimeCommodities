
var data = document.querySelector("data");
var fetchButton = document.getElementById("fetch-button");
google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);



//added parameter to supply the chart object that the data is for.
function getCommodityBySymbol(symbol, currency, date,forChart) {
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
    console.log(request);
    return request.json();
    })
  .then( function(request){
    console.log("Adding new candle")
    forChart.addCandle(new Candle(date,request.rates.open,request.rates.low,request.rates.high,request.rates.close));
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
  var chart=new CandleChartData(7,stringTooSymbol[commSelect],todayString,[]);
  for (var i=0;i<chart.bins;i++){
    getCommodityBySymbol(stringTooSymbol[commSelect],currency, getStringOfOffsetDate(-1*i),chart);
  }
  chart.buildChartWhenReady();
});

function getStringOfOffsetDate(numDayOffset){
  let dateToString=new Date();
  dateToString.setDate(dateToString.getDate()+numDayOffset);
  return dateToString.getFullYear()+'-'+dateToString.getMonth()+'-'+dateToString.getDate();
}

//draws a chart using the provided parameters. Must provide an object of type CandleChartData.
function drawChart(chartData) {

  var data = google.visualization.arrayToDataTable(chartData.getCandleArray(), true);

  var options = {
    legend:'none'
  };

  var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}

//class to hold a single candle's worth of data from an api call
class Candle{
  constructor(date,open,low,high,close){
    this.date=date;
    this.open=open;
    this.low=low;
    this.high=high;
    this.close=close;
  }
  
  getArray(){
    return ([this.date,this.low,this.open,this.close,this.high]);
  }
}
//class to describe entire chart, should perhaps be integrated with Vian's api calls directly, or alternatively will be built out to take whatever data she fetches as a param.
class CandleChartData{
  constructor(bins,symbol,startDate,candles){
      this.bins=bins;
      this.symbol=symbol;
      this.startDate=startDate;
      this.candles=candles;
      this.completedRequests=0;
  }
  addCandle(c){
    this.candles.push(c);
    this.completedRequests+=1;
  }
  //returns the candles objects
  returnCandles(){
    return this.candles;
  }

  //function that returns an array of the data contained in the candles, preformatted for google charts.
  //UNSORTED BY DATE. MAY BE OUT OF ORDER DEPENDING ON API RESPONSE TIME Preferably refactor to actually create with date object, then sort using that and return formatted label.
  //Would make it easier to display, say, the day of the week or whatever.
  getCandleArray(){
    var fullData=[];
    for (var i=0;i<this.candles.length;i++){
      console.log(this.candles[i].getArray());
      fullData.push(this.candles[i].getArray());
    }
    return fullData;
  }

  //Async function that awaits data for all specified bins before drawing chart.
  async buildChartWhenReady(){
      console.log("waiting on "+this.bins+" total");
      console.log(this.completedRequests+" requests completed so far.")
      await this.until(_ => this.bins==this.completedRequests);
      console.log("done.");
      console.log(this);
      drawChart(this);
  }
  //utility function from the internet, awaits a conditional function
  until(conditionFunction) {
    const poll = resolve => {
      if(conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }
    return new Promise(poll);
  }
}

