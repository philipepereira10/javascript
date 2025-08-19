let tarefas = [];

function adicionarTarefa() {
       
      // Recebe valor input do utilizador
      let inputTarefa = document.getElementById("inputTarefa");
      let tarefa = inputTarefa.value.trim(); //trim para retirar espaços em branco

      let mensagem = document.getElementById("mensagem");

      if(tarefa == "") {
          let mensagemErro = "Por favor introduza uma tarefa!"
          mensagem.innerHTML = mensagemErro;
          mensagem.style.color = "#A34743";
        } else {
          let mensagemSucesso = "Tarefa adicionada com sucesso!";
          mensagem.innerHTML = mensagemSucesso;
          mensagem.style.color = "#28a745";

          tarefas.push(tarefa); // array tarefas com push para adicionar ao array

          renderizarTarefas();


      }
    
      //limpa o input
    inputTarefa.value = ""
 
}

  function renderizarTarefas() {
      const listaTarefas = document.getElementById("listaTarefas");
      listaTarefas.innerHTML = "";
      // for itens na lista
      // 1. item inicial
      // 2. item final (condiçáo)
      // 3. se vai de 1 em 1 


      for(let i = 0; i < tarefas.length; i++ ) {

        let novaTarefa = document.createElement("li");
        novaTarefa.textContent = tarefas[i];

        let botaoRemover = document.createElement("button");
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"; 
        botaoRemover.onclick = () => removerTarefa(i);

        let botaoEditar = document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarTarefa(i);

        novaTarefa.appendChild(botaoRemover);
        novaTarefa.appendChild(botaoEditar);
        //appendChild vai chamar o elemneto filho dentro do elemento Ul (Pai) o elemento li (filho)
        listaTarefas.appendChild(novaTarefa);

      }
  }

  function removerTarefa(i) {
    tarefas.splice(i, 1)
    renderizarTarefas();
  }

  function editarTarefa(i) {
    let tarefaEditada = prompt("Edite a tarefa:")
    
    if(tarefaEditada.trim() !== "") {
      tarefas[i] = tarefaEditada;
      renderizarTarefas();
    }
  }

  function limparLista() {
    tarefas.length = 0;
    renderizarTarefas();
    let mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Lista de tarefas limpa com su"
    }