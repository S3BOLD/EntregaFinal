/**
 * @swagger
 * /dashboard/total-expenses:
 *   get:
 *     summary: Total de gastos
 *     tags:
 *       - Dashboard
 */

/**
 * @swagger
 * /dashboard/expenses-count:
 *   get:
 *     summary: Quantidade de despesas
 *     tags:
 *       - Dashboard
 */

/**
 * @swagger
 * /dashboard/expenses-by-category:
 *   get:
 *     summary: Total por categoria
 *     tags:
 *       - Dashboard
 */

const express = require("express");

const router = express.Router();

const ExpenseController = require("../controller/expenses");
const DashboardView = require("../view/dashboard");
const auth = require("../middlewares/auth");

router.get("/total-expenses", auth, async (req, res, next) => {

    try {

        const total = await DashboardController.totalExpenses();

        return res.json(

            DashboardView.totalExpenses(total)

        );

    } catch (err) {

        next(err);

    }

});

router.get("/expenses-count", auth, async (req, res, next) => {

    try {

        const count = await DashboardController.expensesCount();

        return res.json(

            DashboardView.expensesCount(count)

        );

    } catch (err) {

        next(err);

    }

});

router.get("/expenses-by-category", auth, async (req, res, next) => {

    try {

        const result = await DashboardController.expensesByCategory();

        return res.json(

            DashboardView.expensesByCategory(result)

        );

    } catch (err) {

        next(err);

    }

});

module.exports = router;