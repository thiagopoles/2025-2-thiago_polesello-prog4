window.chartUmidade = null;

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('iniciarPesquisa', function(event) {
        const { dataInicial, dataFinal, tipoGrafico } = event.detail;
        carregarDadosUmidade(dataInicial, dataFinal, tipoGrafico);
    });

    setTimeout(() => {
        const dataInicial = document.getElementById('dataInicial');
        const dataFinal = document.getElementById('dataFinal');
        
        if (dataInicial && dataFinal && dataInicial.value && dataFinal.value) {
            const tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;
            carregarDadosUmidade(dataInicial.value, dataFinal.value, tipoGrafico);
        }
    }, 400);
});

function carregarDadosUmidade(valorDataInicial, valorDataFinal, tipoGrafico) {
    const paragrafoErroGrafico = document.getElementById('pErro');
    
    // Validações básicas
    if (!valorDataInicial || !valorDataFinal) {
        return; // Deixa o formController lidar com os erros principais
    }

    if (valorDataInicial > valorDataFinal) {
        return; // Deixa o formController lidar com os erros principais
    }

    let url = `../PHP/consultasPTQA/umidade.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("Umidade - URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("Umidade - Status:", response.status);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Umidade - Dados recebidos:", data);

            if (data.debug) {
                console.log("Umidade - Debug info:", data.debug);
                return;
            }

            if (data.length > 0) {
                atualizarGraficoUmidade(data, tipoGrafico);

                window.dispatchEvent(new CustomEvent('dadosUmidadeCarregados', {
                    detail: {
                        dados: data,
                        tipoGrafico: tipoGrafico,
                        dataInicial: valorDataInicial,
                        dataFinal: valorDataFinal
                    }
                }));
            } else {
                console.log("Umidade - Array vazio recebido");
            }
        })
        .catch(error => {
            console.error('Umidade - Erro completo:', error);
        });
}

function atualizarGraficoUmidade(data, tipoGrafico) {
    const canvas = document.getElementById('umidade');
    if (!canvas) {
        console.error('Umidade - Canvas não encontrado');
        return;
    }

    const labels = data.map(item => item.dataleitura);
    const umidade = data.map(item => item.umidade);

    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.chartUmidade instanceof Chart) {
        window.chartUmidade.destroy();
    }

    const config = {
        type: tipoGrafico,
        data: {
            labels: labels,
            datasets: [{
                label: 'Umidade Relativa (%)',
                data: umidade,
                backgroundColor: getBackgroundColor(tipoGrafico, 'rgba(75, 192, 192, 0.2)'),
                borderColor: 'rgba(75, 192, 192, 1)',
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
                    text: `Umidade - ${getPeriodoTexto(data)}`,
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Umidade: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: tipoGrafico !== 'pie' ? {
                y: {
                    beginAtZero: true,
                    max: 100, // Umidade vai até 100%
                    title: {
                        display: true,
                        text: 'Umidade (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
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

    window.chartUmidade = new Chart(ctx, config);
    console.log("Umidade - Gráfico atualizado com sucesso");
}

function getBackgroundColor(tipoGrafico, corPadrao) {
    if (tipoGrafico === 'pie') {
        return [
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(153, 102, 255, 0.8)'
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

function classificarUmidade(valorUmidade) {
    if (valorUmidade < 30) return { classe: 'Muito Baixa', cor: '#FF6B6B' };
    if (valorUmidade < 40) return { classe: 'Baixa', cor: '#FFA726' };
    if (valorUmidade < 60) return { classe: 'Ideal', cor: '#66BB6A' };
    if (valorUmidade < 70) return { classe: 'Alta', cor: '#FFA726' };
    return { classe: 'Muito Alta', cor: '#FF6B6B' };
}

window.atualizarUmidade = function(dataInicial, dataFinal, tipoGrafico) {
    carregarDadosUmidade(dataInicial, dataFinal, tipoGrafico);
};