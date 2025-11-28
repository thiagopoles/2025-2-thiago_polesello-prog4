function carregarTemperaturaInterna(inicio, fim) {
    fetch(`../PHP/consultasMABEL/ti.php?inicio=${inicio}&fim=${fim}`)
    .then(r => r.json())
    .then(dados => {
        chart = new Chart(document.getElementById("grafico"), {
            type: "line",
            data: {
                labels: dados.map(x => x.datahora),
                datasets: [{
                    label: "Temperatura Interna (°C)",
                    data: dados.map(x => x.ti),
                    borderWidth: 2
                }]
            }
        });
    });
}