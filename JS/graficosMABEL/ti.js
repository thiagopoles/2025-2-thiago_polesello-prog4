const url = new URL(document.currentScript.src);
const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

fetch(`localhost/2025-2-thiago_polesello-prog4/PHP/consultasMABEL/ti.php?inicio=${inicio}&fim=${fim}`)
.then(r => r.json())
.then(dados => {

    chart = new Chart(document.getElementById("grafico"), {
        type: "line",
        data: {
            labels: dados.map(x => x.datahora),
            datasets: [{
                label: "Temperatura Interna (°C)",
                data: dados.map(x => x.ti)
            }]
        }
    });

});
