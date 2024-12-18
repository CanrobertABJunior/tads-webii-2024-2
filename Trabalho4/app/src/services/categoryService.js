import prisma from "../models/prismaClient.js";

export const createNewCategory = async ({ userId, title }) => {
  return await prisma.category.create({
    data: { title, userId },
  });
};

export const getCategoriesWithTodos = async (userId) => {
  return await prisma.category.findMany({
    where: { userId: parseInt(userId) },
    include: { todoLists: true },
    orderBy: { title: "asc" },
  });
};
