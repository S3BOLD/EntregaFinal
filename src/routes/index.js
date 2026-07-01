const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
router.use('/categories', require('./category'));
router.use('/expenses', require('./expenses'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;
