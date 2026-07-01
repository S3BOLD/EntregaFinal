const Model = require('../model/category');

module.exports = {

    async getAll() {
        return await Model.getAll();
    },

    async getById(id) {
        return await Model.getById(id);
    },

    async create(name, description) {
        if (!name) {
            throw new Error('O nome da categoria é obrigatório');
        }
        return await Model.create(name, description);
    },

    async update(id, name, description) {
        const data = {};
        if (name) data.name = name;
        if (description !== undefined) data.description = description;

        return await Model.update(id, data);
    },

    async delete(id) {
        return await Model.delete(id);
    }
};
