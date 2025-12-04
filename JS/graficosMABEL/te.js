function carregarTemperaturaExterna(inicio, fim){
    // Destruir gráfico anterior
    if (window.graficoAtual) {
        window.graficoAtual.destroy();
    }
    
    fetch(`../PHP/consultasMABEL/te.php?inicio=${inicio}&fim=${fim}`)
    .then(r => r.json())
    .then(dados => {
        const ctx = document.getElementById("grafico").getContext("2d");
        
        window.graficoAtual = new Chart(ctx, {  // Armazenar globalmente
            type: "line",
            data: {
                labels: dados.map(x => x.datahora),
                datasets: [{
                    label: "Temperatura Externa (°C)",  // ✅ CORRIGIDO
                    data: dados.map(x => x.te),         // ✅ CORRIGIDO
                    borderWidth: 2,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                }]
            },
            options: {
                responsive: true,
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
        console.error('Erro na temperatura externa:', error);
        alert('Erro ao carregar temperatura externa');
    });
}