// Variáveis globais
const numerosEscolhidos = new Set();
const maxDezenas = 60;

// Função para criar a cartela de 1 a 60
function criarCartela() {
    const cartela = document.getElementById("cartela");
    for (let i = 1; i <= maxDezenas; i++) {
        const botao = document.createElement("button");
        botao.textContent = i;
        botao.addEventListener("click", () => selecionarNumero(i, botao));
        cartela.appendChild(botao);
    }
}

// Função para selecionar/desmarcar um número
function selecionarNumero(numero, botao) {
    if (numerosEscolhidos.has(numero)) {
        numerosEscolhidos.delete(numero);
        botao.classList.remove("selecionado");
    } else {
        numerosEscolhidos.add(numero);
        botao.classList.add("selecionado");
    }

    // Atualiza os números escolhidos no texto
    atualizarNumerosEscolhidos();

    // Habilita/desabilita o botão "Gerar"
    document.getElementById("gerar").disabled = numerosEscolhidos.size < 6;
}

// Atualiza o texto com os números escolhidos (ordenados)
function atualizarNumerosEscolhidos() {
    const texto = document.getElementById("numeros-escolhidos");
    const numerosOrdenados = Array.from(numerosEscolhidos).sort((a, b) => a - b);
    texto.textContent = `Números escolhidos: ${
        numerosOrdenados.length > 0 ? numerosOrdenados.join(", ") : "Nenhum"
    }`;
}

// Função para gerar combinações únicas
function gerarCombinacoes(dezenas, jogosDesejados) {
    if (dezenas.length < 6) throw new Error("São necessárias pelo menos 6 dezenas.");

    const jogosGerados = new Set(); // Usar Set para evitar duplicatas

    while (jogosGerados.size < jogosDesejados) {
        const jogo = [];
        while (jogo.length < 6) {
            const numero = dezenas[Math.floor(Math.random() * dezenas.length)];
            if (!jogo.includes(numero)) {
                jogo.push(numero);
            }
        }
        jogosGerados.add(jogo.sort((a, b) => a - b).join(","));
    }

    return Array.from(jogosGerados).map(j => j.split(",").map(Number));
}

// Função para processar o clique em "Gerar Combinações"
document.getElementById("gerar").addEventListener("click", () => {
    const jogosInput = document.getElementById("jogos").value;

    if (!jogosInput) {
        alert("Por favor, informe o número de jogos.");
        return;
    }

    const dezenas = Array.from(numerosEscolhidos);
    const jogos = parseInt(jogosInput);

    try {
        const combinacoes = gerarCombinacoes(dezenas, jogos);
        const resultadosDiv = document.getElementById("resultados");
        const jogosGeradosDiv = document.getElementById("jogos-gerados");
        jogosGeradosDiv.innerHTML = "";

        combinacoes.forEach((jogo, index) => {
            const p = document.createElement("p");
            p.textContent = `Jogo ${index + 1}: ${jogo.join(", ")}`;
            jogosGeradosDiv.appendChild(p);
        });

        resultadosDiv.style.display = "block";
    } catch (error) {
        console.error("Erro ao gerar combinações:", error);
    }
});

// Inicializa a cartela na página
criarCartela();
