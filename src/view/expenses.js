const Controller = require('../controller/expenses');
const { getAll } = require('./category');

module.exports = {

    async create(req, res) {
        try {
            const userId = req.userId;
            const { description, amount, date, status, categoryId } = req.body || {};

            const expense = await Controller.create(userId, { description, amount, date, status, categoryId });
            const expenseCompleta = await Controller.getById(userId, expense.id);

            res.status(201).json(expenseCompleta);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async getAll(req, res) {
        try {
            const userId = req.userId;
            // Filtros aceitos na query string: category, status, startDate, endDate, minAmount, maxAmount
            const expenses = await Controller.getAll(userId, req.query);
            res.json(expenses);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async getById(req, res) {
        try {
            const userId = req.userId;
            const expense = await Controller.getById(userId, req.params.id);
            if (!expense) {
                return res.status(404).json({ erro: 'Despesa não encontrada' });
            }
            res.json(expense);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async update(req, res) {
        try {
            const userId = req.userId;
            const { description, amount, date, status, categoryId } = req.body || {};

            const expense = await Controller.update(userId, req.params.id, { description, amount, date, status, categoryId });
            if (!expense) {
                return res.status(404).json({ erro: 'Despesa não encontrada' });
            }
            res.json(expense);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async delete(req, res) {
        try {
            const userId = req.userId;
            const removida = await Controller.delete(userId, req.params.id);
            if (!removida) {
                return res.status(404).json({ erro: 'Despesa não encontrada' });
            }
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
};
