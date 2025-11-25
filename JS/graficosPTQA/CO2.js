let botaoPesquisa = document.getElementById("botaoPesquisa");
let dataInicial = document.getElementById("dataInicial");
let dataFinal = document.getElementById("dataFinal");
let paragrafoErroGrafico = document.getElementById("pErro");

let graficoAtual = null; // ← para destruir o gráfico anterior

function chamarBackend(event) {
    event.preventDefault();

    let valorDataInicial = dataInicial.value;
    let valorDataFinal = dataFinal.value;

    if (!valorDataInicial || !valorDataFinal) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    paragrafoErroGrafico.innerText = "";

    let url = `http://localhost/2025-2-thiago_polesello-prog4/PHP/consultasPTQA/CO2.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}`;

    console.log("URL chamada:", url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("JSON recebido:", data);

            if (data.length === 0) {
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado.";
                return;
            }

            const labels = data.map(item => item.dataleitura);
            const mediaCo2 = data.map(item => item.media_co2);

            const ctx = document.getElementById('graficoMabel').getContext('2d');

            // remove gráfico antigo
            if (graficoAtual) {
                graficoAtual.destroy();
            }

            graficoAtual = new Chart(ctx, {
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
                    scales: { y: { beginAtZero: true } }
                }
            });

        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
}

botaoPesquisa.addEventListener("click", chamarBackend);
