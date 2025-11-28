const url = new URL(document.currentScript.src);
const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

fetch(`../PHP/consultasPTQA/aqi4.php?inicio=${inicio}&fim=${fim}`)
.then(r => r.json())
.then(dados => {

    chart = new Chart(grafico, {
        type: "bar",
        data: {
            labels: dados.map(x => x.datahora),
            datasets: [{
                label: "AQI (≥ 4)",
                data: dados.map(x => x.aqi),
                borderWidth: 1
            }]
        }
    });

});
