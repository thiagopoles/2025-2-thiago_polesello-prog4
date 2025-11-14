/* var series = {
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
    chart.render(); */

    function renderGraph(data_inicio, data_fim) {
        fetch(`getData.php?data_inicio=${data_inicio}&data_fim=${data_fim}`)
        .then(response => response.json())
        .then(data => {
            // Definindo a estrutura do gráfico com os dados
            var options = {
                series: [{
                    name: "Temperatura",
                    data: data.temperaturas // Dados de temperatura
                }, 
                {
                    name: "Umidade",
                    data: data.umidades // Dados de umidade
                }],
                chart: {
                    type: 'line',
                    height: 500 // Tamanho do gráfico
                },
                stroke: {
                    width: 3, // espessura da linha
                    curve: 'smooth' // Curva suave para as linhas
                },
                title: {
                    text: 'Temperatura e Umidade', // Título do gráfico
                    align: 'left'
                },
                xaxis: {
                    categories: data.datas, // Datas do gráfico
                },
                yaxis: {
                    title: {
                        text: 'Valores' // Rótulo do eixo Y
                    }
                },
                grid: {
                    borderColor: '#f1f1f1'
                }
            };
    
            // Criando o gráfico
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        })
        .catch(err => console.error("Erro ao carregar dados:", err));
    }
    
    // Exemplo de uso: Definindo um intervalo de datas
    renderGraph('2023-01-01', '2023-01-31');