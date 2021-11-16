import { Schema } from "joi";
import { userValidationSchema } from "./user.validator";

interface Validators {
  [Key: string]: Schema;
}

export const Validators: Validators = {
  ...userValidationSchema,
};
