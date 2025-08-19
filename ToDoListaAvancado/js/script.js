// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue; // armazena o valor antigo ao editar uma tarefa

// =========================
// Funções principais
// =========================

// Cria e salva uma nova tarefa
const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  // título da tarefa
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  // botão de concluir
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  // botão de editar
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  // botão de remover
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  // se a tarefa já estiver concluída (carregada do localStorage)
  if (done) {
    todo.classList.add("done");
  }

  // salva no localStorage
  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

  // adiciona na lista
  todoList.appendChild(todo);

  // limpa campo e foca novamente
  todoInput.value = "";
  todoInput.focus();
};

// Alterna entre formulário de edição e formulário de criação
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

// Atualiza o texto da tarefa
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    // compara com o texto antigo
    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // atualiza no localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

// Pesquisa de tarefas
const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase(); // título em minúsculas
    todo.style.display = "flex"; // mostra por padrão

    // se não encontrar o termo, esconde
    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

// Filtro (todos, concluídos, a fazer)
const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
  }
};

// =========================
// Eventos
// =========================

// Adicionar tarefa
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

// Clique em concluir, editar ou excluir
document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    updateTodoStatusLocalStorage(todoTitle); // atualiza status no localStorage
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
    removeTodoLocalStorage(todoTitle); // remove do localStorage
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

// Cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

// Confirmar edição
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

// 🔍 Pesquisa em tempo real
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value.toLowerCase(); // 🔥 garante minúsculas
  getSearchedTodos(search);
});

// Botão de apagar pesquisa
eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup")); // 🔥 força mostrar todas novamente
});

// Filtro de tarefas
filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterTodos(filterValue);
});

// =========================
// Local Storage
// =========================

const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();
  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  const filteredTodos = todos.filter((todo) => todo.text != todoText);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();
  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Carrega tarefas ao abrir a página
loadTodos();
