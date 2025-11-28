const url = new URL(document.currentScript.src);
const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

fetch(`../PHP/consultasMABEL/ninho.php?inicio=${inicio}&fim=${fim}`)
.then(r => r.json())
.then(dados => {

    chart = new Chart(document.getElementById("grafico"), {
        type: "line",
        data: {
            labels: dados.map(x => x.datahora),
            datasets: [{
                label: "Temperatura do Ninho (°C)",
                data: dados.map(x => x.ninho),
                borderWidth: 2
            }]
        }
    });

});
