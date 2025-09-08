// Middleware cada requisição HTTP recebida
/**
 * Middleware que registra no console o método HTTP e a URL de cada requisição
 * @param {Object} req - Objeto da requisição HTTP
 * @param {Object} res - Objeto da resposta HTTP
 * @param {Function} next - Função para passar para o próximo middleware
 */
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// Exporta o middleware para outras partes
module.exports = logger;
