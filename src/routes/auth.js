/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

const express = require("express");
const router = express.Router();

const AuthController = require("../controller/auth");

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await AuthController.login(email, password);

        res.json(result);

    } catch (err) {

        res.status(401).json({
            error: err.message
        });

    }

});

module.exports = router;