import * as yup from "yup";

// Schemas
export const createTodoSchema = yup.object({
  body: yup.object({
    title: yup.string().required("Título é obrigatório").min(3, "O título deve ter pelo menos 3 caracteres"),
    description: yup.string().required("Descrição é obrigatória").min(5, "A descrição deve ter pelo menos 5 caracteres"),
    dateForConclusion: yup.date().optional().typeError("Formato de data inválido"),
    categoryId: yup.number().optional().integer("O ID da categoria deve ser um número"),
  }),
});

export const updateTodoTitleSchema = yup.object({
  params: yup.object({
    id: yup.number().required("ID é obrigatório").integer("O ID deve ser um número inteiro"),
  }),
  body: yup.object({
    title: yup.string().required("Título é obrigatório").min(3, "O título deve ter pelo menos 3 caracteres"),
  }),
});

export const updateTodoDescriptionSchema = yup.object({
  params: yup.object({
    id: yup.number().required("ID é obrigatório").integer("O ID deve ser um número inteiro"),
  }),
  body: yup.object({
    description: yup.string().required("Descrição é obrigatória").min(5, "A descrição deve ter pelo menos 5 caracteres"),
  }),
});

export const updateTodoDateForConclusionSchema = yup.object({
  params: yup.object({
    id: yup.number().required("ID é obrigatório").integer("O ID deve ser um número inteiro"),
  }),
  body: yup.object({
    dateForConclusion: yup.date().required("A data de conclusão é obrigatória").typeError("Formato de data inválido"),
  }),
});

export const updateTodoCategorySchema = yup.object({
  params: yup.object({
    id: yup.number().required("ID é obrigatório").integer("O ID deve ser um número inteiro"),
  }),
  body: yup.object({
    categoryId: yup.number()
      .nullable()
      .typeError("O ID da categoria deve ser um número ou nulo")
      .integer("O ID da categoria deve ser um número inteiro"),
  }),
});

export const deleteTodoSchema = yup.object({
  params: yup.object({
    id: yup.number().required("ID é obrigatório").integer("O ID deve ser um número inteiro"),
  }),
});