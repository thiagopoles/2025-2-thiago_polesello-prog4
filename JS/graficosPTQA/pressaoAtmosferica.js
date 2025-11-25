window.chartPressao = null;

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('iniciarPesquisa', function(event) {
        const { dataInicial, dataFinal, tipoGrafico } = event.detail;
        carregarDadosPressao(dataInicial, dataFinal, tipoGrafico);
    });

    setTimeout(() => {
        const dataInicial = document.getElementById('dataInicial');
        const dataFinal = document.getElementById('dataFinal');
        
        if (dataInicial && dataFinal && dataInicial.value && dataFinal.value) {
            const tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;
            carregarDadosPressao(dataInicial.value, dataFinal.value, tipoGrafico);
        }
    }, 200);
});

function carregarDadosPressao(valorDataInicial, valorDataFinal, tipoGrafico) {
    const paragrafoErroGrafico = document.getElementById('pErro');
    
    // Validações básicas
    if (!valorDataInicial || !valorDataFinal) {
        return; 
    }

    if (valorDataInicial > valorDataFinal) {
        return; 
    }

    let url = `../PHP/consultasPTQA/pressaoAtmosferica.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("Pressão - URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("Pressão - Status:", response.status);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Pressão - Dados recebidos:", data);

            if (data.debug) {
                console.log("Pressão - Debug info:", data.debug);
                return;
            }

            if (data.length > 0) {
                atualizarGraficoPressao(data, tipoGrafico);
                
                window.dispatchEvent(new CustomEvent('dadosPressaoCarregados', {
                    detail: {
                        dados: data,
                        tipoGrafico: tipoGrafico,
                        dataInicial: valorDataInicial,
                        dataFinal: valorDataFinal
                    }
                }));
            } else {
                console.log("Pressão - Array vazio recebido");
                // Não mostra erro para não conflitar com outros gráficos
            }
        })
        .catch(error => {
            console.error('Pressão - Erro completo:', error);
            // Não mostra erro no parágrafo principal para não conflitar
        });
}

function atualizarGraficoPressao(data, tipoGrafico) {
    const canvas = document.getElementById('pressaoAtmosferica');
    if (!canvas) {
        console.error('Pressão - Canvas não encontrado');
        return;
    }

    const labels = data.map(item => item.dataleitura);
    const pressao = data.map(item => item.pressao);

    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.chartPressao instanceof Chart) {
        window.chartPressao.destroy();
    }

    const config = {
        type: tipoGrafico,
        data: {
            labels: labels,
            datasets: [{
                label: 'Pressão Atmosférica (hPa)',
                data: pressao,
                backgroundColor: getBackgroundColor(tipoGrafico, 'rgba(255, 99, 132, 0.2)'),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: tipoGrafico === 'area'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Pressão Atmosférica - ${getPeriodoTexto(data)}`,
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: tipoGrafico !== 'pie' ? {
                y: {
                    beginAtZero: false, 
                    title: {
                        display: true,
                        text: 'hPa'
                    },
                    min: Math.min(...pressao) - 10, 
                    max: Math.max(...pressao) + 10 
                },
                x: {
                    title: {
                        display: true,
                        text: 'Data'
                    }
                }
            } : {}
        }
    };

    window.chartPressao = new Chart(ctx, config);
    console.log("Pressão - Gráfico atualizado com sucesso");
}

function getBackgroundColor(tipoGrafico, corPadrao) {
    if (tipoGrafico === 'pie') {
        return [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)'
        ];
    }
    return corPadrao;
}

function getPeriodoTexto(data) {
    if (data.length === 0) return '';
    const primeiraData = data[0].dataleitura;
    const ultimaData = data[data.length - 1].dataleitura;
    return `${primeiraData} a ${ultimaData}`;
}

window.atualizarPressao = function(dataInicial, dataFinal, tipoGrafico) {
    carregarDadosPressao(dataInicial, dataFinal, tipoGrafico);
};