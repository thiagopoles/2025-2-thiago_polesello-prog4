// pressaoAtmosferica.js - Gráfico independente
window.chartPressao = null;

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Registrar listener para eventos de pesquisa
    window.addEventListener('iniciarPesquisa', function(event) {
        const { dataInicial, dataFinal, tipoGrafico } = event.detail;
        carregarDadosPressao(dataInicial, dataFinal, tipoGrafico);
    });

    // Carregar dados iniciais após um breve delay
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
        return; // Deixa o formController lidar com os erros principais
    }

    if (valorDataInicial > valorDataFinal) {
        return; // Deixa o formController lidar com os erros principais
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

            // Verificar se veio informações de debug
            if (data.debug) {
                console.log("Pressão - Debug info:", data.debug);
                // Não mostra erro no parágrafo principal para não conflitar com outros gráficos
                return;
            }

            // Se veio dados normais
            if (data.length > 0) {
                atualizarGraficoPressao(data, tipoGrafico);
                
                // Emitir evento para outros gráficos (opcional)
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

    // Configurações específicas para cada tipo de gráfico
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
                    beginAtZero: false, // Pressão geralmente não começa em zero
                    title: {
                        display: true,
                        text: 'hPa'
                    },
                    min: Math.min(...pressao) - 10, // Margem mínima
                    max: Math.max(...pressao) + 10  // Margem máxima
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

// Funções auxiliares
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

// Função para forçar atualização externamente (opcional)
window.atualizarPressao = function(dataInicial, dataFinal, tipoGrafico) {
    carregarDadosPressao(dataInicial, dataFinal, tipoGrafico);
};