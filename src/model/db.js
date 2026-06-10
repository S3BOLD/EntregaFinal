const Sequelize = require('sequelize');

const sequelize = new Sequelize("gestao", "root", "", { host: "localhost", dialect: "mysql" });

module.exports = sequelize;