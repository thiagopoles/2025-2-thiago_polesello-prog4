let chart;

document.getElementById("btnPesquisar").addEventListener("click", () => {

    const grafico = document.getElementById("selecionarGrafico").value;
    const inicio = document.getElementById("dataInicial").value;
    const fim = document.getElementById("dataFinal").value;

    if (!grafico || !inicio || !fim) {
        alert("Preencha todos os campos!");
        return;
    }

    if (chart) chart.destroy();

    const script = document.createElement("script");
    script.src = `localhost/2025-2-thiago_polesello-prog4/JS/graficosMABEL/${grafico}.js?inicio=${inicio}&fim=${fim}&v=` + Date.now();
    document.body.appendChild(script);

});
