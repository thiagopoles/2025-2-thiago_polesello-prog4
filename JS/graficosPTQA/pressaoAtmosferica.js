let botaoPesquisa = document.getElementById("botaoPesquisa");
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

    let url = `http://localhost/2025-2-thiago_polesello-prog4/php/consultasPTQA/pressaoAtmosferica.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("Resposta bruta:", response);
            return response.json();
        })
        .then(data => {
            console.log("JSON recebido:", data);

            if (data.length > 0) {

                // PEGAR DADOS
                const labels = data.map(item => item.dataleitura);
                const pressao = data.map(item => item.pressao);

                // Se já existir gráfico, destruir
                if (window.myChartPressao instanceof Chart) {
                    window.myChartPressao.destroy();
                }

                const ctx = document.getElementById('pressao').getContext('2d');
                window.myChartPressao = new Chart(ctx, {
                    type: tipoGrafico,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Pressão Atmosférica',
                            data: pressao,
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
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado.";
            }
        })
        .catch(error => {
            console.error("Erro ao obter dados:", error);
            paragrafoErroGrafico.innerText = "Erro ao carregar dados.";
        });
}

botaoPesquisa.addEventListener("click", chamarBackend);
