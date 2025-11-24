// qualidadeBaixaDoArAQI.js - Gráfico independente
window.chartQualidadeAr = null;

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Registrar listener para eventos de pesquisa
    window.addEventListener('iniciarPesquisa', function(event) {
        const { dataInicial, dataFinal, tipoGrafico } = event.detail;
        carregarDadosQualidadeAr(dataInicial, dataFinal, tipoGrafico);
    });

    // Carregar dados iniciais após um breve delay
    setTimeout(() => {
        const dataInicial = document.getElementById('dataInicial');
        const dataFinal = document.getElementById('dataFinal');
        
        if (dataInicial && dataFinal && dataInicial.value && dataFinal.value) {
            const tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;
            carregarDadosQualidadeAr(dataInicial.value, dataFinal.value, tipoGrafico);
        }
    }, 300);
});

function carregarDadosQualidadeAr(valorDataInicial, valorDataFinal, tipoGrafico) {
    const paragrafoErroGrafico = document.getElementById('pErro');
    
    // Validações básicas
    if (!valorDataInicial || !valorDataFinal) {
        return; // Deixa o formController lidar com os erros principais
    }

    if (valorDataInicial > valorDataFinal) {
        return; // Deixa o formController lidar com os erros principais
    }

    let url = `http://localhost/2025-2-thiago_polesello-prog4/php/consultasPTQA/baixaQualidadeDoArAQI.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("AQI - URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("AQI - Status:", response.status);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("AQI - Dados recebidos:", data);

            // Verificar se veio informações de debug
            if (data.debug) {
                console.log("AQI - Debug info:", data.debug);
                return;
            }

            // Se veio dados normais
            if (data.length > 0) {
                atualizarGraficoQualidadeAr(data, tipoGrafico);
                
                // Emitir evento para outros gráficos (opcional)
                window.dispatchEvent(new CustomEvent('dadosQualidadeArCarregados', {
                    detail: {
                        dados: data,
                        tipoGrafico: tipoGrafico,
                        dataInicial: valorDataInicial,
                        dataFinal: valorDataFinal
                    }
                }));
            } else {
                console.log("AQI - Array vazio recebido");
            }
        })
        .catch(error => {
            console.error('AQI - Erro completo:', error);
        });
}

function atualizarGraficoQualidadeAr(data, tipoGrafico) {
    const canvas = document.getElementById('qualidadeBaixaDoArAQI');
    if (!canvas) {
        console.error('AQI - Canvas não encontrado');
        return;
    }

    const labels = data.map(item => item.dataleitura);
    const mediaCo2 = data.map(item => item.media_co2);

    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.chartQualidadeAr instanceof Chart) {
        window.chartQualidadeAr.destroy();
    }

    // Configurações específicas para cada tipo de gráfico
    const config = {
        type: tipoGrafico,
        data: {
            labels: labels,
            datasets: [{
                label: 'Índice de Qualidade do Ar (AQI)',
                data: mediaCo2,
                backgroundColor: getBackgroundColor(tipoGrafico, 'rgba(255, 159, 64, 0.2)'),
                borderColor: 'rgba(255, 159, 64, 1)',
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
                    text: `Qualidade do Ar (AQI) - ${getPeriodoTexto(data)}`,
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
                            return `AQI: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: tipoGrafico !== 'pie' ? {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Índice AQI'
                    },
                    // Escala típica de AQI
                    suggestedMin: 0,
                    suggestedMax: Math.max(...mediaCo2) + 50
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

    window.chartQualidadeAr = new Chart(ctx, config);
    console.log("AQI - Gráfico atualizado com sucesso");
}

// Funções auxiliares
function getBackgroundColor(tipoGrafico, corPadrao) {
    if (tipoGrafico === 'pie') {
        return [
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
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

// Função para forçar atualização externamente (opcional)
window.atualizarQualidadeAr = function(dataInicial, dataFinal, tipoGrafico) {
    carregarDadosQualidadeAr(dataInicial, dataFinal, tipoGrafico);
};

// Função para classificar a qualidade do ar baseado no AQI
function classificarQualidadeAr(valorAQI) {
    if (valorAQI <= 50) return { classe: 'Boa', cor: '#00E400' };
    if (valorAQI <= 100) return { classe: 'Moderada', cor: '#FFFF00' };
    if (valorAQI <= 150) return { classe: 'Insalubre para Grupos Sensíveis', cor: '#FF7E00' };
    if (valorAQI <= 200) return { classe: 'Insalubre', cor: '#FF0000' };
    if (valorAQI <= 300) return { classe: 'Muito Insalubre', cor: '#8F3F97' };
    return { classe: 'Perigosa', cor: '#7E0023' };
}