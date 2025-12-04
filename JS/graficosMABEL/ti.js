function carregarTemperaturaInterna(inicio, fim) {
    const container = document.querySelector('.graficoArea');
    
    // 1. Remover canvas existente
    const canvasExistente = document.getElementById('graficoContainer');
    if (canvasExistente) {
        canvasExistente.remove();
    }
    
    // 2. Criar NOVO canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'grafico';
    container.appendChild(canvas);
    
    // 3. Buscar dados e criar gráfico
    fetch(`../PHP/consultasMABEL/ti.php?inicio=${inicio}&fim=${fim}`)
    .then(r => {
        if (!r.ok) throw new Error('Erro HTTP: ' + r.status);
        return r.json();
    })
    .then(dados => {
        const ctx = canvas.getContext("2d");
        
        new Chart(ctx, {
            type: "line",
            data: {
                labels: dados.map(x => x.datahora),
                datasets: [{
                    label: "Temperatura Interna (°C)",
                    data: dados.map(x => x.ti),
                    borderWidth: 3,
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Temperatura Interna (${inicio} a ${fim})`
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
        
        // NÃO precisa armazenar em window.graficoAtual
        // O canvas será removido e recriado na próxima vez
    })
    .catch(error => {
        console.error('Erro na temperatura interna:', error);
        alert('Erro ao carregar temperatura interna');
        
        // Opcional: Mostrar mensagem de erro no canvas
        const ctx = canvas.getContext("2d");
        ctx.font = "16px Arial";
        ctx.fillText("Erro ao carregar dados", 50, 50);
    });
}