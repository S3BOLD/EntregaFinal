const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const { Category } = require('./category');

// Tabela de despesas
const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, // 'PENDENTE' ou 'PAGA'
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'expenses',
    timestamps: false
});

class ExpensesModel {

    async create(data) {
        return await Expense.create(data);
    }

    async getAll(where) {
        return await Expense.findAll({
            where,
            include: { model: Category, as: 'category' }
        });
    }

    async getById(id, userId) {
        return await Expense.findOne({
            where: { id, userId },
            include: { model: Category, as: 'category' }
        });
    }

    async update(id, userId, data) {
        const expense = await Expense.findOne({ where: { id, userId } });
        if (!expense) {
            return null;
        }

        await expense.update(data);
        return expense;
    }

    async delete(id, userId) {
        const expense = await Expense.findOne({ where: { id, userId } });
        if (!expense) {
            return false;
        }

        await expense.destroy();
        return true;
    }
}

const expensesModel = new ExpensesModel();
expensesModel.Expense = Expense;

module.exports = expensesModel;
