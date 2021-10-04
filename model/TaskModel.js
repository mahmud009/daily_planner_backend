import { dbQuery } from "../database/connection.js";
import { nanoid } from "nanoid";

export default class TaskModel {
  constructor() {
    TaskModel.create();
  }
  static async create() {
    const query = `CREATE TABLE IF NOT EXISTS tasks(
            pk_id int NOT NULL AUTO_INCREMENT,
            id text,
            name text,
            description text,
            PRIMARY KEY (pk_id)
        )`;
    return dbQuery(query);
  }

  async getById(id) {
    const query = `SELECT * FROM tasks WHERE id=${id}`;
    return dbQuery(query);
  }
  async insertOne(task) {
    const query = `INSERT INTO tasks (id , name, description) VALUES(
        '${nanoid(15)}', 
        '${task.name}', 
        '${task.description}')`;
    return dbQuery(query);
  }
}
