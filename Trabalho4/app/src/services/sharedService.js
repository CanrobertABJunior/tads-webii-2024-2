import prisma from "../models/prismaClient.js";

export const shareTodoListWithUser = async ({ categoryId, email }) => {
  // Localiza o usuário pelo e-mail
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário com o e-mail fornecido não foi encontrado.");
  }

  // Cria o compartilhamento da Todo List
  return prisma.sharedCategory.create({
    data: {
      categoryId,
      userId: user.id,
    },
  });
};

export const getSharedCategoy = async (userId) => {
  console.log("userId", userId);
  const category = await prisma.sharedCategory.findMany({
    where: { userId: parseInt(userId) },
    include: {
      categories: true,
    },
  });
  if (category.length > 0) {
    for (let i = 0; i < category.length; i++) {
      return await prisma.category.findMany({
        where: { id: parseInt(category[i].id) },
        include: { todoLists: true },
      })
    }
  }
  else
  {
    return category;
  }
  
};
