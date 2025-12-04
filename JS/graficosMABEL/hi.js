function carregarUmidadeInterna(inicio, fim){
    // Destruir gráfico anterior
    if (window.graficoAtual) {
        window.graficoAtual.destroy();
    }
    
    fetch(`../PHP/consultasMABEL/hi.php?inicio=${inicio}&fim=${fim}`)
    .then(r => {
        if (!r.ok) throw new Error('Erro HTTP: ' + r.status);
        return r.json();
    })
    .then(dados => {
        const ctx = document.getElementById("grafico").getContext("2d");
        
        window.graficoAtual = new Chart(ctx, {
            type: "line",
            data: {
                labels: dados.map(x => x.datahora),
                datasets: [{
                    label: "Umidade Interna (%)",  // ✅ CORRIGIDO
                    data: dados.map(x => x.hi),    // ✅ CORRIGIDO (presumo que seja "hi")
                    borderWidth: 3,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Umidade Interna (${inicio} a ${fim})`
                    }
                },
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
        console.error('Erro na umidade interna:', error);
        alert('Erro ao carregar umidade interna');
    });
}