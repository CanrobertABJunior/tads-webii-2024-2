import express from "express";
import { shareTodoList, listSharedCategoy } from "../controllers/sharedController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { shareTodoListSchema, listSharedTodoListsSchema } from "../validators/sharedValidator.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shared
 *   description: Compartilhamento de categorias
 */

/**
 * @swagger
 * /shared/share:
 *   post:
 *     summary: Compartilha uma categoria com outro usuário
 *     tags: [Shared]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *               email:
 *                 type: string
 *             required:
 *               - categoryId
 *               - email
 *     responses:
 *       200:
 *         description: Categoria compartilhada com sucesso
 *       400:
 *         description: Erro ao compartilhar categoria
 */
router.post("/share", authenticateToken, validate(shareTodoListSchema), shareTodoList);

/**
 * @swagger
 * /shared:
 *   get:
 *     summary: Lista todas as categorias compartilhadas com o usuário logado
 *     tags: [Shared]
 *     responses:
 *       200:
 *         description: Lista de categorias compartilhadas
 *       400:
 *         description: Erro ao listar listas compartilhadas
 */
router.get("/", authenticateToken, validate(listSharedTodoListsSchema), listSharedCategoy);

export default router;
