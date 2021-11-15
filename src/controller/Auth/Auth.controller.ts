import { Request, Response, NextFunction } from "express";
import { Handler } from "../Controller";
import { userModel } from "../../model/user.model";

class AuthController {
  @Handler("newUser")
  async addNewUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const dbResponse = await userModel.addNew(user);
    res.status(200).send({ message: dbResponse });
  }
}

export const authController = new AuthController();
