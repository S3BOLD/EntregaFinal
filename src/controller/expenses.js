const Model = require('../model/expenses');

class Expenses {
    
    async create(title, date, amount, description, category) {
        if (!title || !date || !amount || !description) {
            throw new Error('Titulo, Data, valor e descrição são necessarios');
        }
        return Model.create(title, date, amount, description, category || 'General');
    }

    async getAll() {
        return Model.getAll();
    }

    async summary(category) {
        const expenses = await this.getAll();
        const summary = expenses.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {});
        return category ? summary[category] : summary;
    }

    async summaryTotal() {
        const summary = await this.summary();
        return Object.values(summary).reduce((acc, value) => acc + value, 0);
    }
    

    async getById(id) {
        const expense = await Model.getById(id);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    }

    async update(id, title, date, amount, description, category) {
        if (!title || !date || !amount || !description) {
            throw new Error('Titulo,Data, valor e descrição são necessarios');
        }
        return Model.update(id, title, date, amount, description, category || 'General');
    }

    async delete(id) {
        return Model.delete(id);
    }
}

module.exports = new Expenses();