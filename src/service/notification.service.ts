import { Response } from "express";
const errors = {
  userNotFound: "No user found with this email",
  invalidPassword: "Username or password is incorrect",
};

const success = {
  loginSuccess: "Successfully logged in",
  registerSuccess: "Successfully registered",
};

export const notifications = {
  ...errors,
  ...success,
};

export const sendNotification = (
  res: Response,
  message: string,
  status?: number
) => {
  if (status) return res.status(status).send({ message });
  else return res.send({ message });
};
