const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const DashboardView = require('../view/dashboard');

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Estatísticas das despesas do usuário logado
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     FilterCategory:
 *       in: query
 *       name: category
 *       schema:
 *         type: integer
 *       description: Filtrar pelo id da categoria
 *       example: 1
 *     FilterStatus:
 *       in: query
 *       name: status
 *       schema:
 *         type: string
 *         enum: [PENDENTE, PAGA]
 *       description: Filtrar pelo status
 *       example: PAGA
 *     FilterStartDate:
 *       in: query
 *       name: startDate
 *       schema:
 *         type: string
 *         format: date
 *       description: Data inicial do período (AAAA-MM-DD)
 *       example: "2026-06-01"
 *     FilterEndDate:
 *       in: query
 *       name: endDate
 *       schema:
 *         type: string
 *         format: date
 *       description: Data final do período (AAAA-MM-DD)
 *       example: "2026-06-30"
 *     FilterMinAmount:
 *       in: query
 *       name: minAmount
 *       schema:
 *         type: number
 *       description: Valor mínimo
 *       example: 50
 *     FilterMaxAmount:
 *       in: query
 *       name: maxAmount
 *       schema:
 *         type: number
 *       description: Valor máximo
 *       example: 500
 */

/**
 * @swagger
 * /dashboard/total-expenses:
 *   get:
 *     summary: Retorna o total gasto pelo usuário logado
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/FilterCategory'
 *       - $ref: '#/components/parameters/FilterStatus'
 *       - $ref: '#/components/parameters/FilterStartDate'
 *       - $ref: '#/components/parameters/FilterEndDate'
 *       - $ref: '#/components/parameters/FilterMinAmount'
 *       - $ref: '#/components/parameters/FilterMaxAmount'
 *     responses:
 *       200:
 *         description: Total gasto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: double
 *                   example: 3500.50
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/total-expenses', DashboardView.summaryTotal);

/**
 * @swagger
 * /dashboard/expenses-count:
 *   get:
 *     summary: Retorna a quantidade de despesas do usuário logado
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/FilterCategory'
 *       - $ref: '#/components/parameters/FilterStatus'
 *       - $ref: '#/components/parameters/FilterStartDate'
 *       - $ref: '#/components/parameters/FilterEndDate'
 *       - $ref: '#/components/parameters/FilterMinAmount'
 *       - $ref: '#/components/parameters/FilterMaxAmount'
 *     responses:
 *       200:
 *         description: Quantidade de despesas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 45
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/expenses-count', DashboardView.count);

/**
 * @swagger
 * /dashboard/expenses-by-category:
 *   get:
 *     summary: Retorna o total gasto agrupado por categoria
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/FilterStatus'
 *       - $ref: '#/components/parameters/FilterStartDate'
 *       - $ref: '#/components/parameters/FilterEndDate'
 *       - $ref: '#/components/parameters/FilterMinAmount'
 *       - $ref: '#/components/parameters/FilterMaxAmount'
 *     responses:
 *       200:
 *         description: Total por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                     example: Alimentação
 *                   total:
 *                     type: number
 *                     format: double
 *                     example: 1200.00
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/expenses-by-category', DashboardView.expensesByCategory);

module.exports = router;
