const { Op } = require('sequelize');
const Model = require('../model/expenses');
const CategoryModel = require('../model/category');

// Monta o "where" do Sequelize a partir dos filtros da query string:
// category, status, startDate, endDate, minAmount, maxAmount
function montarFiltro(userId, query) {
    const where = { userId };

    if (query.category) {
        where.categoryId = query.category;
    }

    if (query.status) {
        where.status = query.status;
    }

    if (query.startDate || query.endDate) {
        where.date = {};
        if (query.startDate) where.date[Op.gte] = query.startDate;
        if (query.endDate) where.date[Op.lte] = query.endDate;
    }

    if (query.minAmount || query.maxAmount) {
        where.amount = {};
        if (query.minAmount) where.amount[Op.gte] = query.minAmount;
        if (query.maxAmount) where.amount[Op.lte] = query.maxAmount;
    }

    return where;
}

module.exports = {

    async create(userId, data) {
        const { description, amount, date, status, categoryId } = data;

        if (!description || !amount || !date || !categoryId) {
            throw new Error('Descrição, valor, data e categoria são obrigatórios');
        }
        if (amount <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
        if (status && status !== 'PENDENTE' && status !== 'PAGA') {
            throw new Error('O status deve ser PENDENTE ou PAGA');
        }

        const category = await CategoryModel.getById(categoryId);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        return await Model.create({
            description,
            amount,
            date,
            status: status || 'PENDENTE',
            categoryId,
            userId
        });
    },

    async getAll(userId, query) {
        const where = montarFiltro(userId, query);
        return await Model.getAll(where);
    },

    async getById(userId, id) {
        return await Model.getById(id, userId);
    },

    async update(userId, id, data) {
        const { description, amount, date, status, categoryId } = data;

        if (amount !== undefined && amount <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
        if (status && status !== 'PENDENTE' && status !== 'PAGA') {
            throw new Error('O status deve ser PENDENTE ou PAGA');
        }

        const updateData = {};
        if (description) updateData.description = description;
        if (amount !== undefined) updateData.amount = amount;
        if (date) updateData.date = date;
        if (status) updateData.status = status;
        if (categoryId) updateData.categoryId = categoryId;

        return await Model.update(id, userId, updateData);
    },

    async delete(userId, id) {
        return await Model.delete(id, userId);
    },

    // ---- Estatísticas usadas no dashboard ----
    // Obs: os nomes "categoria" e "total" nas respostas abaixo seguem o formato
    // exigido pelo enunciado da disciplina para os endpoints de dashboard.

    async summaryTotal(userId, query) {
        const where = montarFiltro(userId, query);
        const expenses = await Model.getAll(where);

        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        return Number(total.toFixed(2));
    },

    async count(userId, query) {
        const where = montarFiltro(userId, query);
        const expenses = await Model.getAll(where);
        return expenses.length;
    },

    async expensesByCategory(userId, query) {
        const where = montarFiltro(userId, query);
        const expenses = await Model.getAll(where);

        // Agrupa manualmente o total gasto por categoria
        const totalsByCategory = {};
        expenses.forEach(expense => {
            const categoryName = expense.category.name;
            if (!totalsByCategory[categoryName]) {
                totalsByCategory[categoryName] = 0;
            }
            totalsByCategory[categoryName] += expense.amount;
        });

        return Object.keys(totalsByCategory).map(name => ({
            categoria: name,
            total: Number(totalsByCategory[name].toFixed(2))
        }));
    }
};
