const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserView = require('../view/user');

/**
 * @swagger
 * /users:
 *  post:
 *   summary: Cria um novo usuário
 *   tags: [Usuários]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *           properties:
 *            name: 
 *             type: string
 *             example: João
 *            email:
 *              type: string
 *              example: joão@test.com
 *            password:
 *              type: string
 *              example: 123456
 *     responses:
 *        201 :
 *          description: Usúario Cadastrado.
 *  
 *        400 :
 *          description: Dados inválidos.
 *
 * 
 */
router.post('/', UserView.create);

router.get('/', auth, UserView.getAll);

router.get('/:id', auth, UserView.getById);
router.put('/:id', auth, UserView.update);
router.delete('/:id', auth, UserView.delete);

module.exports = router;
