google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Mon', 20, 28, 38, 40]
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