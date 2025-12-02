document.getElementById("btnPesquisar").addEventListener("click", () => {
    const grafico = document.getElementById("selecionarGrafico").value;
    const inicio = document.getElementById("dataInicial").value;
    const fim = document.getElementById("dataFinal").value;

    if (!grafico || !inicio || !fim) {
        alert("Preencha todos os campos!");
        return;
    }

    // Passando os parâmetros para o gráfico
    carregarGrafico(grafico, inicio, fim);
});

// Função que irá passar os dados para o gráfico
function carregarGrafico(grafico, inicio, fim) {
    // Checa qual gráfico deve ser carregado
    switch (grafico) {
        case 'ti':
            carregarTemperaturaInterna(inicio, fim);
            break;
        case 'te':
            carregarTemperaturaExterna(inicio, fim);
            break;
        case 'hi':
            carregarUmidadeInterna(inicio, fim);
            break;
        case 'he':
            carregarUmidadeExterna(inicio, fim);
            break;
        case 'ninho':
            carregarTemperaturaNinho(inicio, fim);
            break;
        default:
            alert("Selecione um gráfico!");
            break;
    }
}