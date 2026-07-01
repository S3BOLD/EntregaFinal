// Agrega os models e garante que as associações sejam registradas
// antes de qualquer uso/sincronização do Sequelize.
const sequelize = require('../config/database');
const UserModel = require('./user');
const CategoryModel = require('./category');
const ExpensesModel = require('./expenses');
const { User, Category, Expense } = require('./associations');

module.exports = {
    sequelize,
    UserModel,
    CategoryModel,
    ExpensesModel,
    User,
    Category,
    Expense
};
