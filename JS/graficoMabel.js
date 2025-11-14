fetch("mabel_dados.php")
    .then(response => response.json())
    .then(data => {

var options = {
    series: [{
            name: "Temperatura Externa",
            data: data.te
        },
        {
            name: "Temperatura Interna",
            data: data.ti
        },
        {
            name: 'Temperatura Do Ninho',
            data: data.ninho
        },
        {
            name: 'Umidade Externa',
            data: data.he // Dados de exemplo para a umidade externa
        },
        {
            name: 'Umidade Interna',
            data: data.hi // Dados de exemplo para a umidade interna
        }
    ],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [5, 7, 5, 5, 5], // Ajustei para todas as linhas
        curve: 'straight', // Linha reta sem curvatura
        dashArray: [0, 0, 0, 0, 0] // Removi os pontilhados, agora todas são linhas contínuas
    },
    title: {
        text: '',
        align: 'left'
    },
    legend: {
        tooltipHoverFormatter: function(val, opts) {
            return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
        }
    },
    markers: {
        size: 0,
        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan']
    },
    tooltip: {
        y: [{
                title: {
                    formatter: function(val) {
                        return val + " (mins)";
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val + " per session";
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val;
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val + " %"; // Para umidade
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val + " %"; // Para umidade
                    }
                }
            }
        ]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

});
