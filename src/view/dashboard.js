const Controller = require('../controller/expenses');

module.exports = {

    // GET /dashboard/total-expenses -> { "total": 3500.50 }
    async summaryTotal(req, res) {
        try {
            const total = await Controller.summaryTotal(req.userId, req.query);
            res.json({ total });
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    // GET /dashboard/expenses-count -> { "quantidade": 45 }
    async count(req, res) {
        try {
            const quantidade = await Controller.count(req.userId, req.query);
            res.json({ quantidade });
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    // GET /dashboard/expenses-by-category -> [ { "categoria": "...", "total": 0 } ]
    async expensesByCategory(req, res) {
        try {
            const resultado = await Controller.expensesByCategory(req.userId, req.query);
            res.json(resultado);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    }
};
