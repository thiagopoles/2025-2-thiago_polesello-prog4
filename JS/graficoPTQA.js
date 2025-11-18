var series = {
  monthDataSeries1: {
    prices: [8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7],
    dates: [
      "2025-10-01",
      "2025-10-02",
      "2025-10-03",
      "2025-10-04",
      "2025-10-05",
      "2025-10-06",
      "2025-10-07",
      "2025-10-08",
      "2025-10-09",
      "2025-10-10"
    ]
  }
};

var options = {
        series: [{
        name: "STOCK ABC",
        data: series.monthDataSeries1.prices
    }],
        chart: {
        type: 'area',
        height: 350,
        zoom: {
        enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },

    title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left'
    },
    subtitle: {
        text: 'Price Movements',
        align: 'left'
    },
    labels: series.monthDataSeries1.dates,
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        opposite: true
    },
    legend: {
        horizontalAlign: 'left'
    }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render(); 
