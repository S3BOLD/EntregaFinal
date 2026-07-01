require('dotenv').config();
const { Sequelize } = require('sequelize');

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'gestao',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
