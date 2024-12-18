import { createNewCategory, getCategoriesWithTodos } from "../services/categoryService.js";

export const createCategory = async (req, res) => {
  const userSessionId = req.userId;
  const todoData = {
    ...req.body,       // Dados do corpo da requisição (title, description)
    userId: userSessionId // Adiciona o userId extraído do middleware
  };
  try {
    const category = await createNewCategory(todoData);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listCategoriesWithTodos = async (req, res) => {
  const userSessionId = req.userId;
  try {
    const categories = await getCategoriesWithTodos(userSessionId);
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
