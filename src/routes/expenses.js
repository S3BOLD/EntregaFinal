const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ExpensesView = require('../view/expenses');

router.use(auth);

// GET /expenses?status=PAGA&category=1&startDate=...&endDate=...&minAmount=...&maxAmount=...

router.get('/', ExpensesView.getAll);
router.get('/:id', ExpensesView.getById);
router.post('/', ExpensesView.create);
router.put('/:id', ExpensesView.update);
router.delete('/:id', ExpensesView.delete);

module.exports = router;
