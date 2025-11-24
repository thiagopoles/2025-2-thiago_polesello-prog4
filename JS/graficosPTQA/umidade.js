let botaoPesquisaUmidade = document.getElementById("botaoPesquisa");
let dataInicialUmidade = document.getElementById("dataInicial");
let dataFinalUmidade = document.getElementById("dataFinal");
let erroUmidade = document.getElementById("pErro");

function chamarBackendUmidade(event) {
    event.preventDefault();

    let valorDataInicial = dataInicialUmidade.value;
    let valorDataFinal = dataFinalUmidade.value;
    let tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;

    if (!valorDataInicial || !valorDataFinal) {
        erroUmidade.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        erroUmidade.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    erroUmidade.innerText = "";

    let url = `http://localhost/2025-2-thiago_polesello-prog4/php/consultasPTQA/umidade.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.length > 0) {
                const labels = data.map(item => item.dataleitura);
                const umidade = data.map(item => item.umidade);

                const ctx = document.getElementById('umidade').getContext('2d');
                new Chart(ctx, {
                    type: tipoGrafico,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Umidade',
                            data: umidade,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });

            } else {
                erroUmidade.innerText = "Nenhum dado encontrado.";
            }
        })
        .catch(error => console.error('Erro ao obter dados:', error));
}

botaoPesquisaUmidade.addEventListener("click", chamarBackendUmidade);
