const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ExpensesView = require('../view/expenses');

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Gerenciamento de despesas
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Lista as despesas do usuário logado (aceita filtros)
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *         description: Filtrar pelo id da categoria
 *         example: 1
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDENTE, PAGA]
 *         description: Filtrar pelo status da despesa
 *         example: PAGA
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial do período (AAAA-MM-DD)
 *         example: "2026-06-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final do período (AAAA-MM-DD)
 *         example: "2026-06-30"
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *         description: Valor mínimo
 *         example: 50
 *       - in: query
 *         name: maxAmount
 *         schema:
 *           type: number
 *         description: Valor máximo
 *         example: 500
 *     responses:
 *       200:
 *         description: Lista de despesas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Filtro inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', ExpensesView.getAll);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Busca uma despesa pelo id
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Despesa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Despesa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', ExpensesView.getById);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Cria uma nova despesa
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *               - date
 *               - categoryId
 *             properties:
 *               description:
 *                 type: string
 *                 example: Supermercado
 *               amount:
 *                 type: number
 *                 format: double
 *                 example: 250.90
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-15"
 *               status:
 *                 type: string
 *                 enum: [PENDENTE, PAGA]
 *                 example: PENDENTE
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Dados inválidos ou categoria inexistente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', ExpensesView.create);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Atualiza uma despesa
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Supermercado
 *               amount:
 *                 type: number
 *                 format: double
 *                 example: 300.00
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-20"
 *               status:
 *                 type: string
 *                 enum: [PENDENTE, PAGA]
 *                 example: PAGA
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Despesa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', ExpensesView.update);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Remove uma despesa
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Despesa removida com sucesso (sem corpo na resposta)
 *       404:
 *         description: Despesa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token não informado ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', ExpensesView.delete);

module.exports = router;
