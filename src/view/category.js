const Controller = require('../controller/category');

module.exports = {

    async getAll(req, res) {
        try {
            const categories = await Controller.getAll();
            res.json(categories);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async getById(req, res) {
        try {
            const category = await Controller.getById(req.params.id);
            if (!category) {
                return res.status(404).json({ erro: 'Categoria não encontrada' });
            }
            res.json(category);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async create(req, res) {
        try {
            const { name, description } = req.body || {};
            const category = await Controller.create(name, description);
            res.status(201).json(category);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async update(req, res) {
        try {
            const { name, description } = req.body || {};
            const category = await Controller.update(req.params.id, name, description);
            if (!category) {
                return res.status(404).json({ erro: 'Categoria não encontrada' });
            }
            res.json(category);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async delete(req, res) {
        try {
            const removida = await Controller.delete(req.params.id);
            if (!removida) {
                return res.status(404).json({ erro: 'Categoria não encontrada' });
            }
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
};
