const Expense = require("../model/expense");
const Category = require("../model/category");

const { fn, col } = require("sequelize");

class DashboardController {

    async totalExpenses() {

        return Expense.sum("amount");

    }

    async expensesCount() {

        return Expense.count();

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

                    as: "category",

                    attributes: [

                        "name"

                    ]

                }

            ],

            group: [

                "categoryId",

                "category.id"

            ]

        });

        return data.map(item => ({

            category: item.category.name,

            total: Number(item.get("total"))

        }));

    }

}

module.exports = new DashboardController();