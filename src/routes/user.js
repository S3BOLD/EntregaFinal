/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastrar usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */

const express = require("express");

const router = express.Router();

const UserController = require("../controller/user");
const UserView = require("../view/user");
const auth = require("../middlewares/auth");

router.post("/", async (req, res, next) => {

    try {

        const user = await UserController.create(

            req.body.name,
            req.body.email,
            req.body.password

        );

        return res.status(201).json(

            UserView.render(user)

        );

    } catch (err) {

        next(err);

    }

});

router.get("/", auth, async (req, res, next) => {

    try {

        const users = await UserController.getAll();

        return res.json(

            UserView.renderMany(users)

        );

    } catch (err) {

        next(err);

    }

});

router.get("/:id", auth, async (req, res, next) => {

    try {

        const user = await UserController.getById(req.params.id);

        if (!user) {

            return res.status(404).json({

                message: "User not found."

            });

        }

        return res.json(

            UserView.render(user)

        );

    } catch (err) {

        next(err);

    }

});

router.put("/:id", auth, async (req, res, next) => {

    try {

        const user = await UserController.update(

            req.params.id,

            req.body

        );

        return res.json(

            UserView.render(user)

        );

    } catch (err) {

        next(err);

    }

});

router.delete("/:id", auth, async (req, res, next) => {

    try {

        await UserController.delete(req.params.id);

        return res.sendStatus(204);

    } catch (err) {

        next(err);

    }

});

module.exports = router;