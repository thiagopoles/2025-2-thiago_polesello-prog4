// CO2.js - Gráfico independente
window.chartCO2 = null;

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar datas padrão
    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');
    
    if (dataInicial && dataFinal) {
        const hoje = new Date();
        const umaSemanaAtras = new Date();
        umaSemanaAtras.setDate(hoje.getDate() - 7);
        
        dataInicial.value = umaSemanaAtras.toISOString().split('T')[0];
        dataFinal.value = hoje.toISOString().split('T')[0];
    }

    // Registrar listener para eventos de pesquisa
    window.addEventListener('iniciarPesquisa', function(event) {
        const { dataInicial, dataFinal, tipoGrafico } = event.detail;
        carregarDadosCO2(dataInicial, dataFinal, tipoGrafico);
    });

    // Carregar dados iniciais
    if (dataInicial && dataFinal) {
        setTimeout(() => {
            const tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;
            carregarDadosCO2(dataInicial.value, dataFinal.value, tipoGrafico);
        }, 100);
    }
});

function carregarDadosCO2(valorDataInicial, valorDataFinal, tipoGrafico) {
    const paragrafoErroGrafico = document.getElementById('pErro');
    
    // Validações básicas
    if (!valorDataInicial || !valorDataFinal) {
        if (paragrafoErroGrafico) {
            paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        }
        return;
    }

    if (valorDataInicial > valorDataFinal) {
        if (paragrafoErroGrafico) {
            paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
        }
        return;
    }

    if (paragrafoErroGrafico) {
        paragrafoErroGrafico.innerText = "Carregando dados de CO₂...";
    }

    let url = `../PHP/consultasPTQA/pressaoAtmosferica.php?dataInicial=${valorDataInicial}&dataFinal=${valorDataFinal}&tipoGrafico=${tipoGrafico}`;

    console.log("CO2 - URL chamada:", url);

    fetch(url)
        .then(response => {
            console.log("CO2 - Status:", response.status);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("CO2 - Dados recebidos:", data);
            
            if (paragrafoErroGrafico) {
                paragrafoErroGrafico.innerText = "";
            }

            // Verificar se veio informações de debug
            if (data.debug) {
                console.log("CO2 - Debug info:", data.debug);
                if (paragrafoErroGrafico) {
                    paragrafoErroGrafico.innerText = `Nenhum dado de CO₂ encontrado. ${data.debug.total_registros} registros no total.`;
                }
                return;
            }

            // Se veio dados normais
            if (data.length > 0) {
                atualizarGraficoCO2(data, tipoGrafico);
                
                // Emitir evento para outros gráficos (opcional)
                window.dispatchEvent(new CustomEvent('dadosCO2Carregados', {
                    detail: {
                        dados: data,
                        tipoGrafico: tipoGrafico,
                        dataInicial: valorDataInicial,
                        dataFinal: valorDataFinal
                    }
                }));
            } else {
                console.log("CO2 - Array vazio recebido");
                if (paragrafoErroGrafico) {
                    paragrafoErroGrafico.innerText = "Nenhum dado de CO₂ encontrado para o período selecionado.";
                }
            }
        })
        .catch(error => {
            console.error('CO2 - Erro completo:', error);
            if (paragrafoErroGrafico) {
                paragrafoErroGrafico.innerText = `Erro ao carregar CO₂: ${error.message}`;
            }
        });
}

function atualizarGraficoCO2(data, tipoGrafico) {
    const canvas = document.getElementById('co2');
    if (!canvas) {
        console.error('CO2 - Canvas não encontrado');
        return;
    }

    const labels = data.map(item => item.dataleitura);
    const mediaCo2 = data.map(item => item.media_co2);

    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.chartCO2 instanceof Chart) {
        window.chartCO2.destroy();
    }

    // Configurações específicas para cada tipo de gráfico
    const config = {
        type: tipoGrafico,
        data: {
            labels: labels,
            datasets: [{
                label: 'Média de CO₂ (ppm)',
                data: mediaCo2,
                backgroundColor: getBackgroundColor(tipoGrafico, 'rgba(54, 162, 235, 0.2)'),
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    text: `CO₂ - ${getPeriodoTexto(data)}`,
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ppm'
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

    window.chartCO2 = new Chart(ctx, config);
    console.log("CO2 - Gráfico atualizado com sucesso");
}

// Funções auxiliares
function getBackgroundColor(tipoGrafico, corPadrao) {
    if (tipoGrafico === 'pie') {
        return [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
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

// Função para forçar atualização externamente (opcional)
window.atualizarCO2 = function(dataInicial, dataFinal, tipoGrafico) {
    carregarDadosCO2(dataInicial, dataFinal, tipoGrafico);
};