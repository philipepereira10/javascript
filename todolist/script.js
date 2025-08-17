// Selecionando elementos do DOM
const tarefaInput = document.getElementById('tarefaInput');
const addTarefaBtn = document.getElementById('addTarefaBtn');
const listaTarefas = document.getElementById('listaTarefas');
const filtros = document.querySelectorAll('.filtro-btn');

let tarefas = []; // Array que vai armazenar as tarefas

// Função para carregar tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
    renderizarTarefas();
}

// Função para salvar tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para adicionar tarefa
function adicionarTarefa() {
    const texto = tarefaInput.value.trim();
    if (texto === '') return; // Não adiciona se estiver vazio

    const tarefa = {
        id: Date.now(),
        texto,
        concluida: false
    };

    tarefas.push(tarefa);
    salvarTarefas();
    renderizarTarefas();
    tarefaInput.value = '';
}

// Função para editar tarefa
function editarTarefa(id) {
    const novaTarefa = prompt('Edite a tarefa:');
    if (novaTarefa) {
        tarefas = tarefas.map(t => t.id === id ? {...t, texto: novaTarefa} : t);
        salvarTarefas();
        renderizarTarefas();
    }
}

// Função para excluir tarefa
function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarTarefas();
    renderizarTarefas();
}

// Função para alternar concluída
function toggleConcluida(id) {
    tarefas = tarefas.map(t => t.id === id ? {...t, concluida: !t.concluida} : t);
    salvarTarefas();
    renderizarTarefas();
}   

function toggleConcluida(id) {
    tarefas = tarefas.map(t => t.id === id ? {...t, concluida: !t.concluida} : t);
    salvarTarefas();
    renderizarTarefas();
}

// Função para renderizar tarefas com filtro
function renderizarTarefas(filtro = 'todas') {
    listaTarefas.innerHTML = '';

    let tarefasFiltradas = tarefas;
    if (filtro === 'pendentes') {
        tarefasFiltradas = tarefas.filter(t => !t.concluida);
    } else if (filtro === 'concluidas') {
        tarefasFiltradas = tarefas.filter(t => t.concluida);
    }

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = tarefa.concluida ? 'concluida' : '';
        
        li.innerHTML = `
            <span>${tarefa.texto}</span>
            <div>
                <button class="concluir" onclick="toggleConcluida(${tarefa.id})">✔️</button>
                <button class="editar" onclick="editarTarefa(${tarefa.id})">✏️</button>
                <button class="excluir" onclick="excluirTarefa(${tarefa.id})">🗑️</button>
            </div>
        `;

        listaTarefas.appendChild(li);
    });
}


// Adicionar tarefa ao clicar no botão
addTarefaBtn.addEventListener('click', adicionarTarefa);

// Permitir adicionar tarefa ao pressionar Enter
tarefaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});

// Adicionar filtros
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        renderizarTarefas(btn.dataset.filtro);
    });
});

// Inicialização
carregarTarefas();
