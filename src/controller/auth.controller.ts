import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "./Controller";
import { userModel } from "../model/user.model";

class AuthController {
  @RequestHandler()
  async addNewUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const dbResponse = await userModel.addNew(user);
    res.status(200).send({ message: dbResponse });
  }
}

export const authController = new AuthController();
