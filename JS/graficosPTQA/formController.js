// formController.js - VERIFICAR SE EXISTE
document.addEventListener('DOMContentLoaded', function() {
    const botaoPesquisa = document.getElementById('botaoPesquisa');
    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');
    const paragrafoErroGrafico = document.getElementById('pErro');

    if (!botaoPesquisa) {
        console.error('Botão de pesquisa não encontrado');
        return;
    }

    botaoPesquisa.addEventListener('click', function(event) {
        event.preventDefault();

        const valorDataInicial = dataInicial.value;
        const valorDataFinal = dataFinal.value;
        const tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;

        // Validações
        if (!valorDataInicial || !valorDataFinal) {
            if (paragrafoErroGrafico) {
                paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
            }
            return;
        }

        if (valorDataInicial > valorDataFinal) {
            if (paragrafoErroGrafico) {
                paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a data final.";
            }
            return;
        }

        // Disparar evento para todos os gráficos
        window.dispatchEvent(new CustomEvent('iniciarPesquisa', {
            detail: {
                dataInicial: valorDataInicial,
                dataFinal: valorDataFinal,
                tipoGrafico: tipoGrafico
            }
        }));

        console.log(`Pesquisa iniciada: ${valorDataInicial} até ${valorDataFinal}`);
    });
});