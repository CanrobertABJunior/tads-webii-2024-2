import * as yup from "yup";

export const createCategorySchema = yup.object({
    body: yup.object({
        title: yup.string().required(),
    }),
});