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


/* let botaoData = document.getElementById("botaoData");
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

                // remove gráfico anterior se existir
                let divGrafico = document.getElementById("graficoPTQA");
                divGrafico.innerHTML = "";

                // criar gráfico com ApexCharts
                var options = {
                    series: [{
                        name: "Média de CO₂ (ppm)",
                        data: mediaCo2
                    }],
                    chart: {
                        type: 'bar',
                        height: 400
                    },
                    xaxis: {
                        categories: labels
                    },
                    yaxis: {
                        title: {
                            text: "ppm"
                        }
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 4
                        }
                    }
                };

                var chart = new ApexCharts(divGrafico, options);
                chart.render();

            } else {
                console.log("Nenhum dado encontrado.");
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado.";
            }
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
}

botaoData.addEventListener("click", chamarBackend); */
