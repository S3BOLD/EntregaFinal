require('dotenv').config();

// Configuração usada pelo Sequelize CLI (npm run db:migrate / db:seed)
module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || null,
        database: process.env.DB_NAME || 'gestao',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
    }
};
