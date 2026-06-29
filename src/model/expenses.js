const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Expense = sequelize.define("Expense", {

    id: {

        type: DataTypes.INTEGER,

        primaryKey: true,

        autoIncrement: true

    },

    title: {

        type: DataTypes.STRING,

        allowNull: false

    },

    description: {

        type: DataTypes.TEXT,

        allowNull: false

    },

    amount: {

        type: DataTypes.FLOAT,

        allowNull: false,

        validate: {

            min: 0

        }

    },

    date: {

        type: DataTypes.DATEONLY,

        allowNull: false

    },

    status: {

        type: DataTypes.ENUM("PENDING", "PAID"),

        defaultValue: "PENDING"

    },

    userId: {

        type: DataTypes.INTEGER,

        allowNull: false

    },

    categoryId: {

        type: DataTypes.INTEGER,

        allowNull: false

    }

}, {

    tableName: "Expenses"

});


class Expenses {

    async create(title, date, amount, description, categoryId, userId) {

        return Expense.create({

            title,
            date,
            amount,
            description,
            categoryId,
            userId

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

                where.amount[Op.gte] = filters.minValue;

            }

            if (filters.maxValue) {

                where.amount[Op.lte] = filters.maxValue;

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

        return Expense.findAll({ where });

    }

    async getById(id) {

        return Expense.findByPk(id);

    }

    async update(id, data) {

        return Expense.update(data, {

            where: { id }

        });

    }

    async delete(id) {

        return Expense.destroy({

            where: { id }

        });

    }

}

module.exports = new Expenses();