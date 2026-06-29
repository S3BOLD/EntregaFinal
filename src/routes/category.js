/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma categoria
 *     tags:
 *       - Categories
 */
const express = require("express");

const router = express.Router();

const CategoryController = require("../controller/category");
const CategoryView = require("../view/category");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res, next) => {

    try {

        const categories = await CategoryController.getAll();

        return res.json(

            CategoryView.renderMany(categories)

        );

    } catch (err) {

        next(err);

    }

});

router.get("/:id", auth, async (req, res, next) => {

    try {

        const category = await CategoryController.getById(req.params.id);

        if (!category) {

            return res.status(404).json({

                message: "Category not found."

            });

        }

        return res.json(

            CategoryView.render(category)

        );

    } catch (err) {

        next(err);

    }

});

router.post("/", auth, async (req, res, next) => {

    try {

        const category = await CategoryController.create(

            req.body.name,

            req.body.description

        );

        return res.status(201).json(

            CategoryView.render(category)

        );

    } catch (err) {

        next(err);

    }

});

router.put("/:id", auth, async (req, res, next) => {

    try {

        const category = await CategoryController.update(

            req.params.id,

            req.body

        );

        return res.json(

            CategoryView.render(category)

        );

    } catch (err) {

        next(err);

    }

});

router.delete("/:id", auth, async (req, res, next) => {

    try {

        await CategoryController.delete(req.params.id);

        return res.sendStatus(204);

    } catch (err) {

        next(err);

    }

});

module.exports = router;