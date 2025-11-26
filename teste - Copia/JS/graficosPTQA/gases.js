const url = new URL(document.currentScript.src);
const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

fetch(`../PHP/consultasPTQA/gases.php?inicio=${inicio}&fim=${fim}`)
.then(r => r.json())
.then(dados => {

    chart = new Chart(grafico, {
        type: "bar",
        data: {
            labels: dados.map(x => x.datahora),
            datasets: [{
                label: "Gases Voláteis (ppb)",
                data: dados.map(x => x.gas),
                borderWidth: 1
            }]
        }
    });

});
