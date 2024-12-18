import * as yup from "yup";

export const shareTodoListSchema = yup.object({
  body: yup.object({
    categoryId: yup.number().integer().required("O ID da categoria é obrigatório."),
    email: yup.string().email().required("O e-mail do usuário é obrigatório."),
  }),
});

export const listSharedTodoListsSchema = yup.object({
  query: yup.object({
    page: yup.number().positive().optional(),
    limit: yup.number().positive().optional(),
  }),
});
