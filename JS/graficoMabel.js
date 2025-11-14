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
