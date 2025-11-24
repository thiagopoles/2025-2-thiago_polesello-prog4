// formController.js - Controlador do formulário
document.addEventListener('DOMContentLoaded', function() {
    const botaoPesquisa = document.getElementById('botaoPesquisa');
    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');
    const paragrafoErroGrafico = document.getElementById('pErro');

    if (!botaoPesquisa) {
        console.error('Botão de pesquisa não encontrado');
        return;
    }

    // Configurar datas padrão (últimos 7 dias)
    const hoje = new Date();
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(hoje.getDate() - 7);
    
    if (dataInicial && dataFinal) {
        dataInicial.value = umaSemanaAtras.toISOString().split('T')[0];
        dataFinal.value = hoje.toISOString().split('T')[0];
    }

    botaoPesquisa.addEventListener('click', function(event) {
        event.preventDefault();

        const valorDataInicial = dataInicial ? dataInicial.value : '';
        const valorDataFinal = dataFinal ? dataFinal.value : '';
        const tipoGrafico = document.querySelector('input[name="tipoGrafico"]:checked').value;

        // Validações básicas
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

        if (paragrafoErroGrafico) {
            paragrafoErroGrafico.innerText = "Iniciando pesquisa...";
        }

        // Disparar evento para todos os gráficos
        window.dispatchEvent(new CustomEvent('iniciarPesquisa', {
            detail: {
                dataInicial: valorDataInicial,
                dataFinal: valorDataFinal,
                tipoGrafico: tipoGrafico
            }
        }));

        console.log(`Pesquisa iniciada: ${valorDataInicial} até ${valorDataFinal}, gráfico: ${tipoGrafico}`);
        
        // Limpar mensagem após 2 segundos
        setTimeout(() => {
            if (paragrafoErroGrafico) {
                paragrafoErroGrafico.innerText = "";
            }
        }, 2000);
    });
});