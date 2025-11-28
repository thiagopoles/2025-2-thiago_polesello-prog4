const url = new URL(document.currentScript.src);
const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

fetch(`localhost/2025-2-thiago_polesello-prog4/PHP/consultasMABEL/he.php?inicio=${inicio}&fim=${fim}`)
.then(r => r.json())
.then(dados => {

    chart = new Chart(document.getElementById("grafico"), {
        type: "line",
        data: {
            labels: dados.map(x => x.datahora),
            datasets: [{
                label: "Umidade Externa (%)",
                data: dados.map(x => x.he),
                borderWidth: 2
            }]
        }
    });

});
