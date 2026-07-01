require('dotenv').config();

// Configuração do JWT usada para gerar e validar o token de login
module.exports = {
    secret: process.env.JWT_SECRET || 'segredo123',
    expiresIn: '1d'
};
