import { createTodoItem, getTodos, getPendingTodos, getOverdueTodos, addCategory, completeTodo } from "../services/todoService.js";

export const createTodo = async (req, res) => {
    const userSessionId = req.userId;
     // Adiciona o userId da sessão ao corpo da requisição
     const todoData = {
        ...req.body,       // Dados do corpo da requisição (title, description)
        userId: userSessionId // Adiciona o userId extraído do middleware
      };
    try {
        const todo = await createTodoItem(todoData);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const listTodos = async (req, res) => {
    const userSessionId = req.userId;
  try {
    const todos = await getTodos(userSessionId);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listPendingTodos = async (req, res) => {
    const userSessionId = req.userId;
  try {
    const todos = await getPendingTodos(userSessionId);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listOverdueTodos = async (req, res) => {
    const userSessionId = req.userId;
  try {
    const todos = await getOverdueTodos(userSessionId);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addCategoryTodo = async (req, res) => {
    console.log("id todoList: ", req.params.id);
  try {
    const todos = await addCategory(req.params.id, req.body.categoryId);
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const markTodoComplete = async (req, res) => {
  try {
    const todo = await completeTodo(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
