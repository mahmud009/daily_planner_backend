import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "./Controller";
import { userModel } from "../model/user.model";
import { compare } from "bcryptjs";
import {
  notifications,
  sendNotification,
} from "../service/notification.service";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

interface LoggedInUser {
  fullName: string;
  email: string;
  uid: string;
}

dotenv.config();
const env = process.env;
const { invalidPassword, userNotFound, loginSuccess, registerSuccess } =
  notifications;

const createAccessToken = async (user: LoggedInUser) => {
  return await sign(user, env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};

const createRefreshToken = async (user: LoggedInUser) => {
  return await sign(user, env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

class AuthController {
  @RequestHandler()
  async register(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    await userModel.addNew(user);
    return sendNotification(res, registerSuccess);
  }

  @RequestHandler()
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // if user not available in db then return with error message
    const user = await userModel.getUserByEmail(email);
    if (!user) return sendNotification(res, userNotFound, 400);

    // if password is not valid then return with error message
    const isValidPassword = await compare(password, user?.password);
    if (!isValidPassword) return sendNotification(res, invalidPassword, 400);

    // creating and sending jwt
    const loggedInUser = {
      email: user.email,
      fullName: user.fullName,
      uid: user.uid,
    };

    const accessToken = await createAccessToken(loggedInUser);
    const refreshToken = await createRefreshToken(loggedInUser);

    res.cookie("trt", refreshToken, {
      httpOnly: true,
    });

    return res.send({
      accessToken,
      loggedInUser,
    });
  }
}

export const authController = new AuthController();
