import { response } from "express";
import { nanoid } from "nanoid";
import { Model } from "./Model";

interface User {
  name: string;
  email: string;
  password: string;
}

class UserModel extends Model {
  constructor() {
    super();
    this.createSchema();
  }

  async createSchema() {
    const schema = `CREATE TABLE IF NOT EXISTS users (PK INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(1000) NOT NULL, uid VARCHAR(255) NOT NULL)`;
    await this.runQuery(schema);
    console.log("user table checked");
  }

  async addNew(user: User) {
    const query = `INSERT INTO users (name, email, password, uid) values(?)`;
    const values = [user.name, user.email, user.password, nanoid(10)];
    await this.runQuery(query, [values]);
    return "user added successfully";
  }
  update() {}
  delete() {}
  getOne() {}
}

export const userModel = new UserModel();
