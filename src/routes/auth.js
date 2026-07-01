const express = require('express');
const router = express.Router();
const UserView = require('../view/user');

// POST /auth/login
router.post('/login', UserView.login);

module.exports = router;
