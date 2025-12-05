// Inputs 
let botaoData = document.getElementById("btnPesquisar");
let dataInicial = document.getElementById("dataInicial");
let dataFinal = document.getElementById("dataFinal");
let paragrafoErroGrafico = document.getElementById("pErro");
let selectMabel = document.getElementById("selectMabel");
let selectPTQA = document.getElementById("selectPTQA");
let frequencia = document.getElementById("filtroFrequencia");
let consultaPTQA, consultaMabel, url = null;
let graficoAtual = null;


// =============================
// Função principal do gráfico
// =============================
function chamarBackend(event) {
    event.preventDefault();

    const inicio = dataInicial.value;
    const fim = dataFinal.value;
    const frequencia = filtroFrequencia.value;

    if (!inicio || !fim) {
        paragrafoErroGrafico.innerText = "Por favor, preencha as duas datas.";
        return;
    }

    if (inicio > fim) {
        paragrafoErroGrafico.innerText = "A data inicial não pode ser maior que a final.";
        return;
    }

    if (!frequencia || frequencia <= 0) {
        paragrafoErroGrafico.innerText = "O valor do filtro deve ser maior que zero.";
        return;
    }

    paragrafoErroGrafico.innerText = "";

    if (selectPTQA) {
        consultaPTQA = document.getElementById("selectPTQA").value;
        if (consultaPTQA === "") {
            paragrafoErroGrafico.innerText = "Por favor, selecione um tipo de gráfico.";
            return;
        }
        url =
        `http://localhost/2025-2-thiago_polesello-prog4/backend/${consultaPTQA}.php?` +
        `dataInicial=${inicio}&dataFinal=${fim}&freq=${frequencia}`;
    }

    if (selectMabel) {
        consultaMabel = document.getElementById("selectMabel").value;
        if (consultaPTQA === "") {
            paragrafoErroGrafico.innerText = "Por favor, selecione um tipo de gráfico.";
            return;
        }
        url =
        `http://localhost/2025-2-thiago_polesello-prog4/backend/${consultaMabel}.php?` +
        `dataInicial=${inicio}&dataFinal=${fim}&freq=${frequencia}`;
    }

    console.log("URL construída:", url);

    fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log("URL da requisição:", url);
            console.log("JSON recebido:", data);

            if (!data || data.length === 0) {
                paragrafoErroGrafico.innerText = "Nenhum dado encontrado.";
                return;
            }

            // Selecionar campo de data/hora baseado em qual select está ativo
            let campoData, campoHora;

            if (selectPTQA) {
                campoData = "dataleitura";
                campoHora = "horaleitura";
            }

            if (selectMabel) {
                campoData = "datainclusao";
                campoHora = "horainclusao";
            }

            const labels = data.map(d => `${d[campoData] ?? ""} ${d[campoHora] ?? ""}`);

            // Pega colunas de valores
            const campos = Object.keys(data[0]);

            const colunasValidas = campos.filter(c =>
                c !== campoData &&
                c !== campoHora
            );

            const datasets = colunasValidas.map(col => ({
                label: col,
                data: data.map(d => d[col]),
                borderWidth: 2
            }));

            if (graficoAtual) graficoAtual.destroy();

            const tituloGrafico = colunasValidas.join(", ");

            const ctx = document.getElementById("grafico").getContext("2d");

            graficoAtual = new Chart(ctx, {
                type: "bar",
                data: { labels, datasets },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: tituloGrafico,
                            font: { size: 18 }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(err => console.error("Erro:", err));
}


// Botão de gerar gráfico
botaoData.addEventListener("click", chamarBackend);
