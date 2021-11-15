import joi from "joi";

const newUser = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

export const validationSchema = {
  newUser,
};
