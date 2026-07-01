const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const CategoryView = require('../view/category');

router.use(auth);

router.get('/', CategoryView.getAll);
router.get('/:id', CategoryView.getById);
router.post('/', CategoryView.create);
router.put('/:id', CategoryView.update);
router.delete('/:id', CategoryView.delete);

module.exports = router;
