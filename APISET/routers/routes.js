// Importa o framework Express para criar rotas
const express = require("express");
// Cria um roteador para definir rotas específicas
const router = express.Router();
// Importa os dados iniciais dos alunos (simulando um banco de dados em memória)
let alunos = require("../dados/sampleDados.js");


// Retorna a lista completa de alunos em formato JSON.
router.get("/alunos", (req, res) => {
  res.json(alunos);
});

//adiciona um novo aluno
 router.post("/alunos", (req, res) => {
  const { nome, cpf, telefone, email, matricula, escola } = req.body;
  const novoAluno = {
    id: alunos.length + 1,
    nome,
    cpf,
    telefone,
    email,
    matricula,
    escola
  };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// Edita um aluno existente
// Atualiza os dados do aluno com o ID especificado.
router.put("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone, email, matricula, escola } = req.body;

  let aluno = alunos.find(a => a.id == id);
  if (!aluno) return res.status(404).json({ msg: "Aluno não encontrado" });

  aluno.nome = nome || aluno.nome;
  aluno.cpf = cpf || aluno.cpf;
  aluno.telefone = telefone || aluno.telefone;
  aluno.email = email || aluno.email;
  aluno.matricula = matricula || aluno.matricula;
  aluno.escola = escola || aluno.escola;

  res.json(aluno);
});

// remover um aluno
router.delete("/alunos/:id", (req, res) => {
  const { id } = req.params;
  alunos = alunos.filter(a => a.id != id);
  res.json({ msg: "Aluno removido com sucesso" });
});

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
