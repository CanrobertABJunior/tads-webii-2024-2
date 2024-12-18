import express from "express";
import { createCategory, listCategoriesWithTodos } from "../controllers/categoryController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createCategorySchema } from "../validators/categoryValidator.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro ao criar categoria
 */
router.post("/", authenticateToken, validate(createCategorySchema), createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias com suas tarefas
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias com suas tarefas
 *       400:
 *         description: Erro ao listar categorias
 */
router.get("/", authenticateToken, listCategoriesWithTodos);

export default router;

