// Lista de produtos disponíveis
const produtos = [
  { id: 1, nome: "Camisola", preco: 20.00,  imagem: "img/camiseta.jpg"},
  { id: 2, nome: "Calça Jeans", preco: 45.50,  imagem: "img/calcajeans.jpg"},
  { id: 3, nome: "Tênis Nike", preco: 70.00,  imagem: "img/tenisnike.jpg"},
  { id: 4, nome: "Boné", preco: 15.00,  imagem: "img/bone.jpg"},
];

// Estado do carrinho
let carrinho = [];

// Seleção de elementos
const listaProdutos = document.getElementById("lista-produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalEl = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar");

// Funções principais

// Mostrar produtos na tela
function carregarProdutos() {
  produtos.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
      <h3>${produto.nome}</h3>
      <p>Preço: €${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarCarrinho(${produto.id})">Adicionar</button>
    `;
    listaProdutos.appendChild(div);
  });
}

// Adicionar produto ao carrinho
function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  atualizarCarrinho();
}

// Atualizar exibição do carrinho
function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.textContent = `${item.nome} - €${item.preco.toFixed(2)} `;
    
    // Botão remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.onclick = () => removerItem(index);
    li.appendChild(btnRemover);

    itensCarrinho.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

// Remover item do carrinho
function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();  
}

// Finalizar compra
finalizarBtn.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert("Compra finalizada com sucesso!");
    carrinho = [];
    atualizarCarrinho();
  }
});

// Iniciar loja
carregarProdutos();
