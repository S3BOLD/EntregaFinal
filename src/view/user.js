const Controller = require('../controller/user');

module.exports = {

    async create(req, res) {
        try {
            const { name, email, password } = req.body || {};
            const user = await Controller.create(name, email, password);
            res.status(201).json(user);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body || {};
            const resultado = await Controller.login(email, password);
            res.json(resultado);
        } catch (erro) {
            res.status(401).json({ erro: erro.message });
        }
    },

    async getAll(req, res) {
        try {
            const users = await Controller.getAll();
            res.json(users);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async getById(req, res) {
        try {
            const user = await Controller.getById(req.params.id);
            if (!user) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            res.json(user);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async update(req, res) {
        try {
            const { name, email, password } = req.body || {};
            const user = await Controller.update(req.params.id, name, email, password);
            if (!user) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            res.json(user);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async delete(req, res) {
        try {
            const removido = await Controller.delete(req.params.id);
            if (!removido) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            res.status(204).send();
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
};
