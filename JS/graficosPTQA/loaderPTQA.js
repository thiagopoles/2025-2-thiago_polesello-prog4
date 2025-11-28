let chart;

document.getElementById("btnPesquisar").addEventListener("click", () => {

    const graph = document.getElementById("selecionarGrafico").value;
    const inicio = document.getElementById("dataInicial").value;
    const fim = document.getElementById("dataFinal").value;

    if (!graph || !inicio || !fim) {
        alert("Selecione o gráfico e as datas!");
        return;
    }

    if (chart) chart.destroy();

    carregarJS(`localhost/2025-2-thiago_polesello-prog4/JS/graficosPTQA/${graph}.js?inicio=${inicio}&fim=${fim}`);
});

function carregarJS(src) {
    const script = document.createElement("script");
    script.src = src + "&v=" + Date.now();
    document.body.appendChild(script);
}