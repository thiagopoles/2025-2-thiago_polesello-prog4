function carregarTemperaturaNinho(inicio, fim){
    // Destruir gráfico anterior
    if (window.graficoAtual) {
        window.graficoAtual.destroy();
    }
    
    fetch(`../PHP/consultasMABEL/ninho.php?inicio=${inicio}&fim=${fim}`)
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
                    label: "Temperatura do Ninho (°C)",  // ✅ CORRIGIDO
                    data: dados.map(x => x.temperatura_ninho || x.tn || x.ninho), // ✅ Ajuste o nome da coluna
                    borderWidth: 3,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Temperatura do Ninho (${inicio} a ${fim})`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperatura (°C)'
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Erro na temperatura do ninho:', error);
        alert('Erro ao carregar temperatura do ninho');
    });
}