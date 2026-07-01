const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

// Verifica se o token JWT foi enviado e é válido
module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não informado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, auth.secret);
        req.userId = decoded.id;
        next();
    } catch (erro) {
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
};
