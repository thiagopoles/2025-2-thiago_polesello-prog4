let botaoDataAQI = document.getElementById("botaoData");
let dataInicialAQI = document.getElementById("dataInicial");
let dataFinalAQI = document.getElementById("dataFinal");
let erroAQI = document.getElementById("pErro");

function chamarBackendAQI(event) {
    event.preventDefault();

    let valorDataInicial = dataInicialAQI.value;
    let valorDataFinal = dataFinalAQI.value;

    if (!valorDataInicial || !valorDataFinal) {
        erroAQI.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        erroAQI.innerText = "A data inicial não pode ser maior que a data final.";
        return;
    }

    erroAQI.innerText = "";

    let url = `http://localhost/2025-2-thiago_polesello-prog4/php/consultasPTQA/baixaQualidadeDoArAQI.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.length > 0) {
                const labels = data.map(item => item.dataleitura);
                const mediaCo2 = data.map(item => item.media_co2);

                const ctx = document.getElementById('qualidadeBaixaDoArAQI').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Baixa Qualidade do Ar',
                            data: mediaCo2,   // ← CORREÇÃO AQUI
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
                erroAQI.innerText = "Nenhum dado encontrado.";
            }
        })
        .catch(error => console.error('Erro ao obter dados:', error));
}

botaoDataAQI.addEventListener("click", chamarBackendAQI);
