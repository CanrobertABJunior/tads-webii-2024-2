import * as yup from "yup";

export const createTodoSchema = yup.object({
    body: yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
    }),
});