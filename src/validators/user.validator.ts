import joi, { Schema } from "joi";

const addNewUser: Schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

export const userValidationSchema = {
  addNewUser,
};
