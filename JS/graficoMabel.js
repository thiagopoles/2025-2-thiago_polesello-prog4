<<<<<<< Updated upstream
fetch("consultasSQL.sql")
    .then(response => response.json())
    .then(data => {

        /* Gráfico Mabel */
        var options = {
            series: [
                {
                    name: "Temperatura Externa",
                    data: data.te
                },
                {
                    name: "Temperatura Interna",
                    data: data.ti
                },
                {
                    name: "Temperatura Do Ninho",
                    data: data.tn
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: { enabled: false }
            },
            dataLabels: { enabled: false },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            title: {
                text: 'Estatísticas Do Ninho',
                align: 'left'
            },
            markers: { size: 0 },
            xaxis: {
                categories: data.categorias
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    });
=======
/* var options = {
    series: [{
            name: "Temperatura Externa",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
            name: "Temperatura Interna",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
            name: 'Temperatura Do Ninho',
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        },
        {
            name: 'Umidade Externa',
            data: [45, 42, 50, 55, 48, 50, 53, 60, 65, 62, 60, 58] // Dados de exemplo para a umidade externa
        },
        {
            name: 'Umidade Interna',
            data: [40, 38, 45, 50, 47, 44, 48, 52, 55, 50, 49, 46] // Dados de exemplo para a umidade interna
        }
    ],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [5, 7, 5, 5, 5], // Ajustei para todas as linhas
        curve: 'straight', // Linha reta sem curvatura
        dashArray: [0, 0, 0, 0, 0] // Removi os pontilhados, agora todas são linhas contínuas
    },
    title: {
        text: 'Estatísticas Do Ninho',
        align: 'left'
    },
    legend: {
        tooltipHoverFormatter: function(val, opts) {
            return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
        }
    },
    markers: {
        size: 0,
        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan']
    },
    tooltip: {
        y: [{
                title: {
                    formatter: function(val) {
                        return val + " (mins)";
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val + " per session";
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val;
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val + " %"; // Para umidade
                    }
                }
            },
            {
                title: {
                    formatter: function(val) {
                        return val + " %"; // Para umidade
                    }
                }
            }
        ]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render(); */


/* // Função para obter os dados do servidor (PHP)
async function getDataFromServer() {
    try {
        // Requisição ao PHP
        const response = await fetch('api/getData.php');  // Caminho correto para o PHP no servidor
        const data = await response.json();  // Converte a resposta JSON

        // Verifica se os dados foram retornados corretamente
        if (!data || data.length === 0) {
            console.error('Nenhum dado encontrado');
            return;
        }

        // Monta os dados para o gráfico
        const chartData = formatChartData(data);

        // Configuração do gráfico
        const options = {
            series: [{
                name: "Temperatura Externa",
                data: chartData.temperaturaExterna
            },
            {
                name: "Temperatura Interna",
                data: chartData.temperaturaInterna
            },
            {
                name: 'Umidade Externa',
                data: chartData.umidadeExterna
            },
            {
                name: 'Umidade Interna',
                data: chartData.umidadeInterna
            }],
            chart: {
                height: 600,
                type: 'line',
                zoom: { enabled: false },
            },
            dataLabels: { enabled: false },
            stroke: {
                width: [5, 7, 5, 5],
                curve: 'straight',
                dashArray: [0, 0, 0, 0], // Linhas sólidas, sem pontilhado
            },
            title: { text: 'Estatísticas Do Ninho', align: 'left' },
            markers: { size: 0, hover: { sizeOffset: 6 } },
            xaxis: { categories: chartData.dates },  // Data dinâmica
            tooltip: {
                y: [
                    { title: { formatter: function(val) { return val + " (°C)"; }} },
                    { title: { formatter: function(val) { return val + " (°C)"; }} },
                    { title: { formatter: function(val) { return val + " %"; }} },
                    { title: { formatter: function(val) { return val + " %"; }} }
                ]
            },
            grid: { borderColor: '#f1f1f1' },
        };

        // Criação do gráfico
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    } catch (error) {
        console.error('Erro ao carregar dados do servidor: ', error);
    }
}

// Função para formatar os dados para o gráfico
function formatChartData(data) {
    const dates = [];
    const temperaturaExterna = [];
    const temperaturaInterna = [];
    const umidadeExterna = [];
    const umidadeInterna = [];

    data.forEach(row => {
        dates.push(row.data); // Adiciona as datas
        temperaturaExterna.push(row.temperatura_externa);
        temperaturaInterna.push(row.temperatura_interna);
        umidadeExterna.push(row.umidade_externa);
        umidadeInterna.push(row.umidade_interna);
    });

    return { dates, temperaturaExterna, temperaturaInterna, umidadeExterna, umidadeInterna };
}

// Chama a função para obter os dados e gerar o gráfico
getDataFromServer();
 */
>>>>>>> Stashed changes
