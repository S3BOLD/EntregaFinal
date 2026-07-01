const Model = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

module.exports = {

    // Cadastra um novo usuário com a senha criptografada
    async create(name, email, password) {
        if (!name || !email || !password) {
            throw new Error('Nome, email e senha são obrigatórios');
        }
        if (password.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
        }

        const existingUser = await Model.getByEmail(email);
        if (existingUser) {
            throw new Error('Já existe um usuário com este email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Model.create(name, email, hashedPassword);

        return { id: user.id, name: user.name, email: user.email };
    },

    // Faz login e retorna um token JWT
    async login(email, password) {
        const user = await Model.getByEmail(email);
        if (!user) {
            throw new Error('Email ou senha inválidos');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new Error('Email ou senha inválidos');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            auth.secret,
            { expiresIn: auth.expiresIn }
        );

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email }
        };
    },

    async getAll() {
        const users = await Model.getAll();
        return users.map(u => ({ id: u.id, name: u.name, email: u.email }));
    },

    async getById(id) {
        const user = await Model.getById(id);
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email };
    },

    async update(id, name, email, password) {
        const data = {};
        if (name) data.name = name;
        if (email) data.email = email;

        if (password) {
            if (password.length < 6) {
                throw new Error('A senha deve ter pelo menos 6 caracteres');
            }
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await Model.update(id, data);
        if (!user) return null;

        return { id: user.id, name: user.name, email: user.email };
    },

    async delete(id) {
        return await Model.delete(id);
    }
};
