// temperatura.js — VERSÃO FINAL

const url = new URL(document.currentScript.src);
const inicio = url.searchParams.get("inicio");
const fim = url.searchParams.get("fim");

if (!inicio || !fim) {
  alert("Datas não informadas para o gráfico.");
} else {
  fetch(`http://localhost/2025-2-thiago_polesello-prog4/PHP/consultasPTQA/temperatura.php?inicio=${inicio}&fim=${fim}`)
    .then(r => r.json())
    .then(dados => {
      if (!Array.isArray(dados) || dados.length === 0) {
        alert("Nenhum dado encontrado nesse período.");
        return;
      }

      const labels = dados.map(x => x.datahora);
      const valores = dados.map(x => x.temperatura);

      if (window.chart) {
        try { window.chart.destroy(); } catch (e) {}
      }

      const ctx = document.getElementById("grafico");

      window.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Temperatura (°C)",
            data: valores,
            borderWidth: 3,
            borderColor: "orange",
            backgroundColor: "rgba(255,165,0,0.3)",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: "Data e Hora" } },
            y: { title: { display: true, text: "°C" } }
          }
        }
      });
    })
    .catch(err => alert("Erro ao carregar dados: " + err.message));
}
