fetch("dados_grafico.php")
    .then(response => response.json())
    .then(data => {

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
                    data: data.ninho
                },
                {
                    name: "Umidade Externa",
                    data: data.he
                },
                {
                    name: "Umidade Interna",
                    data: data.hi
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: { enabled: false }
            },
            dataLabels: { enabled: false },
            stroke: {
                width: [5,7,5,5,5],
                curve: 'straight'
            },
            xaxis: {
                categories: data.labels
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    });
