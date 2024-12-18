import express from "express";
import { createTodo, listTodos, listPendingTodos, listOverdueTodos, markTodoComplete, addCategoryTodo } from "../controllers/todoController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { createTodoSchema } from "../validators/todoValidator.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dateForConclusion 
 *             properties:
 *               title:
 *                 type: string
 *                 example: Comprar mantimentos
 *               description:
 *                 type: string
 *                 example: Comprar frutas, vegetais e leite
 *               dateForConclusion:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-31
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authenticateToken, validate(createTodoSchema), createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *       400:
 *         description: Erro ao listar tarefas
 */
router.get("/", authenticateToken, listTodos);

/**
 * @swagger
 * /todos/pending:
 *   get:
 *     summary: Lista todas as tarefas pendentes
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Lista de tarefas pendentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   concludeAt:
 *                     type: string
 *                     format: date-time
 *                   completed:
 *                     type: boolean
 *       400:
 *         description: Erro ao listar tarefas pendentes
 */
router.get("/pending", authenticateToken, listPendingTodos);

/**
 * @swagger
 * /todos/overdue:
 *   get:
 *     summary: Lista todas as tarefas atrasadas
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Lista de tarefas atrasadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   concludeAt:
 *                     type: string
 *                     format: date-time
 *                   completed:
 *                     type: boolean
 *       400:
 *         description: Erro ao listar tarefas atrasadas
 */
router.get("/overdue", authenticateToken, listOverdueTodos);

/**
 * @swagger
 * /todos/{id}/addCategory:
 *   patch:
 *     summary: "Adiciona uma categoria a uma todoList"
 *     description: "Essa rota permite adicionar uma categoria a uma todoList existente."
 *     operationId: addCategoryTodo
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID da todoList"
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: "ID da categoria a ser associada à todoList"
 *                 example: 2
 *     responses:
 *       '200':
 *         description: "Categoria adicionada com sucesso à todoList"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Minha ToDo List"
 *                 description:
 *                   type: string
 *                   example: "Descrição da minha todoList"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "Trabalho"
 *       '400':
 *         description: "Requisição inválida, falta parâmetro ou dados incorretos"
 *       '404':
 *         description: "TodoList ou categoria não encontrada"
 *       '500':
 *         description: "Erro no servidor ao processar a requisição"
 */
router.patch("/:id/addCategory", authenticateToken, addCategoryTodo);

/**
 * @swagger
 * /todos/{id}/complete:
 *   patch:
 *     summary: Marca uma tarefa como concluída
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser concluída
 *     responses:
 *       200:
 *         description: Tarefa marcada como concluída
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 concludeAt:
 *                   type: string
 *                   format: date-time
 *                 completed:
 *                   type: boolean
 *       400:
 *         description: Erro ao marcar a tarefa como concluída
 */
router.patch("/:id/complete", authenticateToken, markTodoComplete);

export default router;