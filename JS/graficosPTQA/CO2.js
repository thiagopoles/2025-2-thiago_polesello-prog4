/*let botaoPesquisa = document.getElementById("botaoPesquisa");
let dataInicial = document.getElementById("dataInicial");
let dataFinal = document.getElementById("dataFinal");
let paragrafoErroGrafico = document.getElementById("pErro");

function chamarBackend(event) {
    event.preventDefault();

    let valorDataInicial = dataInicial.value;
    let valorDataFinal = dataFinal.value;
    let tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;

    // Validações
    if (!valorDataInicial || !valorDataFinal) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    paragrafoErroGrafico.innerText = "";

    let url = `http://localhost/2025-2-thiago_polesello-prog4/PHP/consultasPTQA/CO2.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("Resposta bruta:", response);
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log("JSON recebido:", data);

            // Destruir gráfico anterior se existir
            if (window.myChartCO2 instanceof Chart) {
                window.myChartCO2.destroy();
            }

            if (data.length > 0 && !data.erro) {
                const labels = data.map(item => item.dataleitura);
                const mediaCo2 = data.map(item => item.media_co2);

                const ctx = document.getElementById('graficoPTQACO2').getContext('2d');
                window.myChartCO2 = new Chart(ctx, {
                    type: tipoGrafico,
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
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

            } else {
                console.log("Nenhum dado encontrado.");
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado para o período selecionado.";
            }
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
            paragrafoErroGrafico.innerText = "Erro ao carregar dados do gráfico.";
        });
}

// Adicionar event listener
botaoPesquisa.addEventListener("click", chamarBackend);*/

function chamarBackend(event) {
    event.preventDefault();

    let valorDataInicial = dataInicial.value;
    let valorDataFinal = dataFinal.value;
    let tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;

    // Validações
    if (!valorDataInicial || !valorDataFinal) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    paragrafoErroGrafico.innerText = "Carregando...";

    let url = `http://localhost/2025-2-thiago_polesello-prog4/PHP/consultasPTQA/CO2.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("Status:", response.status);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados completos recebidos:", data);
            
            // Verificar se veio informações de debug
            if (data.debug) {
                console.log("Debug info:", data.debug);
                paragrafoErroGrafico.innerText = `Nenhum dado encontrado. O banco tem ${data.debug.total_registros} registros (período: ${data.debug.min_date} até ${data.debug.max_date})`;
                return;
            }

            // Se veio dados normais
            if (data.length > 0) {
                paragrafoErroGrafico.innerText = "";
                
                // Destruir gráfico anterior se existir
                if (window.myChartCO2 instanceof Chart) {
                    window.myChartCO2.destroy();
                }

                const labels = data.map(item => item.dataleitura);
                const mediaCo2 = data.map(item => item.media_co2);

                const ctx = document.getElementById('graficoPTQACO2').getContext('2d');
                window.myChartCO2 = new Chart(ctx, {
                    type: tipoGrafico,
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
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

            } else {
                console.log("Array vazio recebido");
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado para o período selecionado.";
            }
        })
        .catch(error => {
            console.error('Erro completo:', error);
            paragrafoErroGrafico.innerText = `Erro: ${error.message}`;
        });
}