const { Op, fn, col } = require("sequelize");

const Expense = require("../model/expense");
const Category = require("../model/category");
const User = require("../model/user");

class ExpenseController {

    async create(title, date, amount, description, categoryId, userId) {

        if (!title || !date || !amount || !description || !categoryId || !userId) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        return await Expense.create({
            title,
            date,
            amount,
            description,
            categoryId,
            userId,
            status: "PENDING"
        });

    }

    async getAll(filters = {}) {

        const where = {};

        if (filters.status) {
            where.status = filters.status;
        }

        if (filters.categoryId) {
            where.categoryId = filters.categoryId;
        }

        if (filters.minValue || filters.maxValue) {

            where.amount = {};

            if (filters.minValue) {
                where.amount[Op.gte] = Number(filters.minValue);
            }

            if (filters.maxValue) {
                where.amount[Op.lte] = Number(filters.maxValue);
            }

        }

        if (filters.startDate || filters.endDate) {

            where.date = {};

            if (filters.startDate) {
                where.date[Op.gte] = filters.startDate;
            }

            if (filters.endDate) {
                where.date[Op.lte] = filters.endDate;
            }

        }

        return await Expense.findAll({

            where,

            include: [

                {
                    model: Category,
                    attributes: ["id", "name"]
                },

                {
                    model: User,
                    attributes: ["id", "name", "email"]
                }

            ],

            order: [["date", "DESC"]]

        });

    }

    async getById(id) {

        const expense = await Expense.findByPk(id, {

            include: [

                Category,

                User

            ]

        });

        if (!expense) {
            throw new Error("Despesa não encontrada.");
        }

        return expense;

    }

    async update(id, data) {

        const expense = await Expense.findByPk(id);

        if (!expense) {
            throw new Error("Despesa não encontrada.");
        }

        await expense.update({

            title: data.title,
            description: data.description,
            amount: data.amount,
            date: data.date,
            status: data.status,
            categoryId: data.categoryId

        });

        return expense;

    }

    async delete(id) {

        const expense = await Expense.findByPk(id);

        if (!expense) {
            throw new Error("Despesa não encontrada.");
        }

        await expense.destroy();

        return {
            message: "Despesa excluída com sucesso."
        };

    }

    async summaryTotal() {

        const total = await Expense.sum("amount");

        return total || 0;

    }

    async expensesCount() {

        return await Expense.count();

    }

    async expensesByCategory() {

        const data = await Expense.findAll({

            attributes: [

                "categoryId",

                [fn("SUM", col("amount")), "total"]

            ],

            include: [

                {

                    model: Category,

                    attributes: ["name"]

                }

            ],

            group: [

                "categoryId",

                "Category.id"

            ]

        });

        return data.map(item => ({

            category: item.Category.name,

            total: Number(item.get("total"))

        }));

    }

}

module.exports = new ExpenseController();