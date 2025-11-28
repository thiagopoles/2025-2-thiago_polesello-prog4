const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

fetch(`localhost/2025-2-thiago_polesello-prog4/PHP/consultasMABEL/hi.php?inicio=${inicio}&fim=${fim}`)
.then(r => r.json())
.then(dados => {

    chart = new Chart(document.getElementById("grafico"), {
        type: "line",
        data: {
            labels: dados.map(x => x.datahora),
            datasets: [{
                label: "Umidade Interna (%)",
                data: dados.map(x => x.hi),
                borderWidth: 2
            }]
        }
    });

});

