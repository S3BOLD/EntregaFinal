const UserController = require('../controller/user');

class User {
    constructor() {
    }

    async login(req, res) {
        try {
            const { email, password } = req.body || {};

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const auth = await UserController.login(email, password);
            return res.json(auth);
        } catch (error) {
            console.error('Erro em logar Usuário: ', error);
            return res.status(401).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const user = await UserController.getAll();
            res.json(users);
        } catch (error) {
            console.error('Erro em chamar Usuário: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res, status(400).json({ error: 'Email, senha e nome são obrigatóios' });
            }

            const newUser = await UserController.create(email, password, name);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Erro em criar Usuário: ', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await UserController.getById(id);

            res.json(user);
        } catch (error) {
            console.error('Erro em chamar Usuário: ', error);
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { email, password, name } = req.body;

            const updateUser = await UserController.update(id, email, password, name);
            if (!updateUser) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.json(updateUser);
        } catch (error) {
            console.error('Erro em atualizar Usuário', error);
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await UserController.delete(id);
            if (result === null) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Erro em deletar Usuário: ', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new User();