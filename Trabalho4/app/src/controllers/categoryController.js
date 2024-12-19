import { createNewCategory, getCategoriesWithTodos, updateCategoryById, deleteCategoryById } from "../services/categoryService.js";

export const createCategory = async (req, res) => {
  const userSessionId = req.userId;
  const todoData = {
    ...req.body,
    userId: userSessionId
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
  const page = req.query.pag || 1;
  const limit = req.query.limit || 10;
  try {
    const categories = await getCategoriesWithTodos(userSessionId, page, limit);
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategoryTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const userSessionId = req.userId;

  try {
    const updatedCategory = await updateCategoryById(id, title, userSessionId);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userSessionId = req.userId;

  try {
    await deleteCategoryById(id, userSessionId);
    res.status(204).send("Categoria excluida com sucesso!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};