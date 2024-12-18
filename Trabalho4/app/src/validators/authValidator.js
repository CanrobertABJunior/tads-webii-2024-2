import * as yup from "yup";

export const registerSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required("O email é obrigatório!"),
        name: yup.string().min(6, "nome deve ser completo").required(),
        password: yup.string().min(6).required(),
    }),
});

export const loginSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required("O email é obrigatório!"),
        password: yup.string().min(6).required(),
    }),
  });