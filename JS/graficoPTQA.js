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
    chart.render(); 
 */

let botaoData = document.getElementById("botaoData");
let dataInicial = document.getElementById("dataInicial");
let dataFinal = document.getElementById("dataFinal");
let paragrafoErroGrafico = document.getElementById("pErro");

function chamarBackend(event) {
    event.preventDefault(); // Impede o form de recarregar a página

    let valorDataInicial = dataInicial.value;
    let valorDataFinal = dataFinal.value;

    // --- VALIDAÇÕES ---
    if (!valorDataInicial || !valorDataFinal) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    // limpa erro se estiver tudo OK
    paragrafoErroGrafico.innerText = "";

    let url = `http://localhost/2025-2-thiago_polesello-prog4/php/consultaCO2.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}` 

    console.log("URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("Resposta bruta:", response);
            return response.json();
        })
        .then(data => {
            console.log("JSON recebido:", data);

            if (data.length > 0) {
                const labels = data.map(item => item.dataleitura);
                const mediaCo2 = data.map(item => item.media_co2);

                const ctx = document.getElementById('graficoPTQA').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Média de CO₂ (ppm)',
                            data: mediaCo2,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

            } else {
                console.log("Nenhum dado encontrado.");
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado."
            }
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
}

botaoData.addEventListener("click", chamarBackend);