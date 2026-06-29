/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Lista despesas
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: minValue
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxValue
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de despesas
 */

const express = require("express");

const router = express.Router();

const ExpenseController = require("../controller/expenses");
const ExpenseView = require("../view/expenses");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res, next) => {

    try {

        const expenses = await ExpenseController.getAll({

            status: req.query.status,
            categoryId: req.query.categoryId,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            minValue: req.query.minValue,
            maxValue: req.query.maxValue

        });

        return res.json(

            ExpenseView.renderMany(expenses)

        );

    } catch (err) {

        next(err);

    }

});

router.get("/:id", auth, async (req, res, next) => {

    try {

        const expense = await ExpenseController.getById(req.params.id);

        return res.json(

            ExpenseView.render(expense)

        );

    } catch (err) {

        next(err);

    }

});

router.post("/", auth, async (req, res, next) => {

    try {

        const expense = await ExpenseController.create(

            req.body.title,
            req.body.date,
            req.body.amount,
            req.body.description,
            req.body.categoryId,
            req.userId

        );

        return res.status(201).json(

            ExpenseView.render(expense)

        );

    } catch (err) {

        next(err);

    }

});

router.put("/:id", auth, async (req, res, next) => {

    try {

        const expense = await ExpenseController.update(

            req.params.id,

            req.body

        );

        return res.json(

            ExpenseView.render(expense)

        );

    } catch (err) {

        next(err);

    }

});

router.delete("/:id", auth, async (req, res, next) => {

    try {

        await ExpenseController.delete(req.params.id);

        return res.sendStatus(204);

    } catch (err) {

        next(err);

    }

});

module.exports = router;