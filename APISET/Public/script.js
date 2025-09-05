// Guarda as referências do form e do container
// Get references to the form and the list container
const form = document.getElementById("alunoForm");
const lista = document.getElementById("listaAlunos");

// Guarda a array dos estudantes em uma string JSON
function salvarLocalStorage(alunos) {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}

// Guarda a array dos estudantes no localstorage
// Ou retorna uma array vazia
function carregarLocalStorage() {
  return JSON.parse(localStorage.getItem("alunos")) || [];
}

// Renderizar lista dos estudantes
function renderAlunos() {
  lista.innerHTML = "";
  const alunos = carregarLocalStorage();
  alunos.forEach((aluno, index) => {
    const li = document.createElement("li");
    li.textContent = `${aluno.nome} - ${aluno.email}`;

    // Criar botão de edição
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.onclick = () => {
      // Populate form fields with selected student data for editing
      document.getElementById("nome").value = aluno.nome;
      document.getElementById("cpf").value = aluno.cpf;
      document.getElementById("telefone").value = aluno.telefone;
      document.getElementById("email").value = aluno.email;
      document.getElementById("matricula").value = aluno.matricula;
      document.getElementById("escola").value = aluno.escola;
      // Guarda o index do estudante sendo editado
      form.dataset.editIndex = index;
    };
    li.appendChild(editBtn);

    // Botão para deletar
    const btn = document.createElement("button");
    btn.textContent = "Excluir";
    btn.onclick = () => {
      alunos.splice(index, 1);
      salvarLocalStorage(alunos);
      renderAlunos();
    };
    li.appendChild(btn);

    lista.appendChild(li);
  });
}

// Handle form submission for adding or editing a student
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const aluno = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    matricula: document.getElementById("matricula").value,
    escola: document.getElementById("escola").value,
  };

  const alunos = carregarLocalStorage();

  if (form.dataset.editIndex !== undefined) {
    // Editar estudante
    const index = parseInt(form.dataset.editIndex);
    alunos[index] = aluno;

    // Atualizar o estudante
    await fetch(`/api/alunos/${index + 1}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    delete form.dataset.editIndex;
  } else {

    // Adicionar estudante
    await fetch("/api/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    alunos.push(aluno);
  }

  salvarLocalStorage(alunos);
  form.reset();
  renderAlunos();
});

// Inicializar
renderAlunos();
