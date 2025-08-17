 
// Dados do Quiz
const perguntas = [
    {
        pergunta: "Qual é a capital de Portugal?",
        opcoes: ["Lisboa", "Porto", "Madrid", "Faro"],
        correta: 0
    },
    {
        pergunta: "Qual linguagem roda no navegador?",
        opcoes: ["Java", "C", "Python", "JavaScript"],
        correta: 3
    },
    {
        pergunta: "Quem criou o JavaScript?",
        opcoes: ["Brendan Eich", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
        correta: 0
    }
];


// Seleção de elementos
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const progressoEl = document.getElementById("progresso");
const proximoBtn = document.getElementById("proximo");
const resultadoEl = document.getElementById("resultado");


// Variáveis de estado
let perguntaAtual = 0;
let pontuacao = 0;
let tempo = 15; // tempo por questão (segundos)
let timer;


// Funções principais

// Carregar pergunta
function carregarPergunta() {
    limparEstado();

    let q = perguntas[perguntaAtual];
    perguntaEl.textContent = q.pergunta;

    q.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.classList.add("opcao");
        btn.addEventListener("click", () => selecionarResposta(index));
        opcoesEl.appendChild(btn);
    });

    progressoEl.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    iniciarTimer();
}

// Limpar tela antes da próxima pergunta
function limparEstado() {
    proximoBtn.disabled = true;
    opcoesEl.innerHTML = "";
    resultadoEl.textContent = "";
    clearInterval(timer);
    tempo = 15;
}

// Selecionar resposta
function selecionarResposta(index) {
    const q = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach((btn, i) => {
        if (i === q.correta) {
            btn.style.backgroundColor = "green"; // resposta certa
            btn.style.color = "white";
        } else if (i === index) {
            btn.style.backgroundColor = "red"; // resposta errada
            btn.style.color = "white";
        }
        btn.disabled = true;
    });

    if (index === q.correta) {
        pontuacao++;
        resultadoEl.textContent = "✅ Correto!";
    } else {
        resultadoEl.textContent = "❌ Errado!";
    }

    proximoBtn.disabled = false;
    clearInterval(timer);
}

// Próxima pergunta
proximoBtn.addEventListener("click", () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultadoFinal();
    }
});

// Timer
function iniciarTimer() {
    timer = setInterval(() => {
        progressoEl.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length} | Tempo: ${tempo}s`;
        tempo--;

        if (tempo < 0) {
            clearInterval(timer);
            resultadoEl.textContent = "⏰ Tempo esgotado!";
            proximoBtn.disabled = false;

            // Bloquear as opções
            const botoes = document.querySelectorAll(".opcao");
            botoes.forEach(btn => btn.disabled = true);
        }
    }, 1000);
}

// Mostrar resultado final
function mostrarResultadoFinal() {
    perguntaEl.textContent = "Fim do Quiz!";    
    perguntaEl.textContent.style = "text-Align: center";
    opcoesEl.innerHTML = "";
    progressoEl.textContent = "";
    resultadoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    proximoBtn.style.display = "none";
}


// Iniciar o Quiz
carregarPergunta();
