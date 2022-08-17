google.charts.load('current', {'packages':['corechart']});


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
      return ([this.date.toDateString(),this.low,this.open,this.close,this.high]);
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
  

  //draws a chart using the provided parameters. Must provide an object of type CandleChartData.
function drawChart(chartData) {

    var data = google.visualization.arrayToDataTable(chartData.getCandleArray(), true);
  
    var options = {
      legend:'none'
    };
  
    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
  
    chart.draw(data, options);
  }