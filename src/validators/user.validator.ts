import joi, { Schema } from "joi";

const register: Schema = joi.object({
  fullName: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().length(6).required(),
});

const login: Schema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});

export const userValidationSchema = {
  register,
  login,
};
