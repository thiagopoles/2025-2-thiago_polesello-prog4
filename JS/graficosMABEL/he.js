function carregarUmidadeExterna(inicio, fim){
    // Destruir gráfico anterior
    if (window.graficoAtual) {
        window.graficoAtual.destroy();
    }
    
    fetch(`../PHP/consultasMABEL/he.php?inicio=${inicio}&fim=${fim}`)
    .then(r => r.json())
    .then(dados => {
        const ctx = document.getElementById("grafico").getContext("2d");
        
        window.graficoAtual = new Chart(ctx, {  // Armazenar globalmente
            type: "line",
            data: {
                labels: dados.map(x => x.datahora),
                datasets: [{
                    label: "Umidade Externa (%)",  // ✅ CORRIGIDO
                    data: dados.map(x => x.he),    // ✅ CORRIGIDO (presumo que seja "he")
                    borderWidth: 2,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Umidade (%)'
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Erro na umidade externa:', error);
        alert('Erro ao carregar umidade externa');
    });
}