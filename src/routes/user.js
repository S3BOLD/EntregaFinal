const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const User = require('../view/user');

router.post('/login', User.login);
router.post('/', User.create);

router.get('/:id', authMiddleware, User.getById);
router.get('/', authMiddleware, User.getAll);
router.put('/:id', authMiddleware, User.update);
router.delete('/:id', authMiddleware, User.delete);

module.exports = router;