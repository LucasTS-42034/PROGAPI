// Importa o framework para o servidor web
const express = require("express");

// Importa o módulo path para manipulação de caminhos de arquivos
const path = require("path");

// Cria uma instância do aplicativo Express
const app = express();

// Importa as rotas definidas no arquivo routes.js
const routes = require("./routers/routes");

// Importa o middleware de logger para registrar as requisições
const logger = require("./Middleware/logger");

// Middleware para interpretar requisições com corpo JSON
app.use(express.json());

// Middleware para logar cada requisição recebida
app.use(logger);

// Define o prefixo "/api" para as rotas da API
app.use("/api", routes);

// Serve arquivos estáticos na pasta "Public"
app.use(express.static(path.join(__dirname, "Public")));

// Define a porta
const PORT = 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
