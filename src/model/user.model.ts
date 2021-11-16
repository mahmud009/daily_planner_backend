import { response } from "express";
import { customAlphabet } from "nanoid";
import { Model } from "./Model";
import { hash } from "bcryptjs";

interface User {
  fullName: string;
  email: string;
  password: string;
}

class UserModel extends Model {
  constructor() {
    super();
    this.createSchema();
  }

  async createSchema() {
    const schema = `CREATE TABLE IF NOT EXISTS users (
      PK INT AUTO_INCREMENT PRIMARY KEY, 
      fullName VARCHAR(255) NOT NULL, 
      email VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(1000) NOT NULL, 
      uid VARCHAR(255) NOT NULL)`;

    await this.runQuery(schema);
    console.log("user table checked");
  }

  async addNew(user: User) {
    const query = `INSERT INTO users (fullName, email, password, uid) values(?)`;
    const uid = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 15);
    const hashedPassword = await hash(user.password, 12);
    const values = [user.fullName, user.email, hashedPassword, uid()];
    return await this.runQuery(query, [values]);
  }

  async getUserByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email=?`;
    const response: Record<string, any> = await this.runQuery(query, [email]);
    if (!(response.length > 0)) return null;
    const user = response[0];
    return user;
  }
  update() {}
  delete() {}
  getOne() {}
}

export const userModel = new UserModel();
