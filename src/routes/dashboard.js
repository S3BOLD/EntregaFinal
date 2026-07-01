const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const DashboardView = require('../view/dashboard');

router.use(auth);

router.get('/total-expenses', DashboardView.summaryTotal);
router.get('/expenses-count', DashboardView.count);
router.get('/expenses-by-category', DashboardView.expensesByCategory);

module.exports = router;
