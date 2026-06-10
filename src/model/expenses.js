const sequelize = require('./db');
const Sequelize = require('sequelize');

const Expense = sequelize.define('Expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},
{
    updatedAt: false
}
);

class Expenses {

    constructor() {}

    async create(title,date, amount, description, category) {
        return Expense.create({title, date, amount, description, category });
    }
    
    async getAll() {
        return Expense.findAll();
    }

    async getById(id) {
        return Expense.findByPk(id);
    }

    async update(id, title, date, amount, description, category) {
        return Expense.update({ title, date, amount, description, category }, { where: { id } });
    }

    async delete(id) {
        return Expense.destroy({ where: { id } });
    }
}

module.exports = new Expenses();