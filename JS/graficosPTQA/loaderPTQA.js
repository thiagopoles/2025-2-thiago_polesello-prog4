// loaderPTQA.js — VERSÃO FINAL

let chart = null;

// remove somente scripts da pasta graficosPTQA
function removeOldGraphScripts() {
  const scripts = document.querySelectorAll("script[src]");
  scripts.forEach(s => {
    if (s.src.includes("/JS/graficosPTQA/")) {
      s.remove();
    }
  });
}

// recria o canvas para evitar bug do Chart.js
function resetCanvas() {
  const oldCanvas = document.getElementById("grafico");
  const parent = oldCanvas.parentNode;

  const newCanvas = document.createElement("canvas");
  newCanvas.id = "grafico";
  newCanvas.style.width = "100%";
  newCanvas.style.height = "100%";

  parent.replaceChild(newCanvas, oldCanvas);
}

// carrega o script do gráfico
function carregarJS(src) {
  removeOldGraphScripts();

  if (chart) {
    try { chart.destroy(); } catch (e) {}
    chart = null;
  }

  resetCanvas();

  const script = document.createElement("script");
  script.src = src + "&v=" + Date.now();
  script.async = true;
  document.body.appendChild(script);
}

document.getElementById("btnPesquisar").addEventListener("click", () => {
  const graph = document.getElementById("selecionarGrafico").value;
  const inicio = document.getElementById("dataInicial").value;
  const fim = document.getElementById("dataFinal").value;

  if (!graph || !inicio || !fim) {
    alert("Selecione o gráfico e as datas!");
    return;
  }

  const src = `http://localhost/2025-2-thiago_polesello-prog4/JS/graficosPTQA/${graph}.js?inicio=${inicio}&fim=${fim}`;

  carregarJS(src);
});
