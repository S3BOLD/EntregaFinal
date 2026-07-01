// Middleware global de tratamento de erros.
// Registrado por último em index.js, depois de todas as rotas.
module.exports = function (erro, req, res, next) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno no servidor' });
};
