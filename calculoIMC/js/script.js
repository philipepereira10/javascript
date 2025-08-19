
// Dados da Tabela de IMC

const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];


// Seleção de elementos do HTML

const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");


// Funções

// Cria a tabela dinamicamente no HTML com base no array "data"
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    // Colunas da tabela
    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    // Junta tudo dentro da linha (div)
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    // Adiciona a linha à tabela principal
    imcTable.appendChild(div);
  });
}

// Valida os inputs, permitindo apenas números e vírgula
function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

// Calcula o IMC (peso / altura²) e deixa com 1 casa decimal
function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

// Limpa os campos de entrada e as classes de cor
function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.className = "";
  imcInfo.className = "";
}

// Alterna entre a tela de cálculo e o resultado
function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}


// Inicialização

createTable(data); // monta a tabela assim que a página abre


// Eventos

// Garante que só entra número e vírgula nos inputs
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);
    e.target.value = updatedValue;
  });
});

// Evento do botão Calcular
calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Troca vírgula por ponto para calcular
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  if (!weight || !height) return; // Se não preencher os dois campos, não faz nada

  const imc = calcImc(height, weight); // calcula IMC
  let info;

  // Descobre a classificação com base no valor do IMC
  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return; // se não encontrou classificação, sai

  // Exibe o resultado no HTML
  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  // Aplica cor de acordo com a classificação
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  // Troca para a tela de resultados
  showOrHideResults();
});

// Evento do botão Limpar
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

// Evento do botão Voltar
backBtn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});
