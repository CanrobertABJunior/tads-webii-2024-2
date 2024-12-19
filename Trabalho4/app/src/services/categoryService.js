import { skip } from "@prisma/client/runtime/library";
import prisma from "../models/prismaClient.js";

export const createNewCategory = async ({ userId, title }) => {
  return await prisma.category.create({
    data: { title, userId },
  });
};

export const getCategoriesWithTodos = async (userId, page, limit) => {
  const skip = (page - 1) * limit; // Cálculo para paginação
  const take = +limit; // Limite por página

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where: { userId: parseInt(userId) },
      include: { todoLists: true },
      orderBy: { title: "asc" },
      skip,
      take,
    }),
    prisma.category.count({ where: { userId: parseInt(userId) } }), // Total de categorias
  ]);

  return {
    categories,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const updateCategoryById = async (id, title, userId) => {
  const category = await prisma.category.findFirst({
    where: { id: parseInt(id), userId: parseInt(userId) },
  });

  if (!category) {
    throw new Error("Categoria não encontrada ou não pertence ao usuário");
  }

  return await prisma.category.update({
    where: { id: parseInt(id) },
    data: { title },
  });
};

export const deleteCategoryById = async (id, userId) => {
  const category = await prisma.category.findFirst({
    where: { id: parseInt(id), userId: parseInt(userId) },
  });

  if (!category) {
    throw new Error("Categoria não encontrada ou não pertence ao usuário");
  }

  await prisma.category.delete({
    where: { id: parseInt(id) },
  });
};