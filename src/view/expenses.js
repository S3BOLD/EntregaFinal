const Controller = require('../controller/expenses');

class Expenses {

    async create(req, res) {
        const { title, date, amount, description, category } = req.body;
        try {
            const created = await Controller.create(title, date, amount, description, category);
            const expense = await Controller.getById(created.id);

            res.status(201).json(expense.dataValues);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const expenses = await Controller.getAll();
            res.json(expenses);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const expense = await Controller.getById(id);
            if (expense) {
                res.json(expense);
            } else {
                res.status(404).json({ message: 'Despesa não encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async summary(req, res) {
        const category = req.query.category;
        try {
            const summary = await Controller.summary(category);
            res.json(summary);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async update(req, res) {
        const id = parseInt(req.params.id);
        const { title, date, amount, description, category } = req.body;
        try {
            const updated = await Controller.update(id, title, date, amount, description, category);
            if (!updated) {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
            const expense = await Controller.getById(id);

            res.json(expense.dataValues);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const hasExpenses = await Controller.delete(id);
            if (!hasExpenses) {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new Expenses();