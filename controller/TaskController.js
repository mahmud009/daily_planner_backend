import TaskModel from "../model/TaskModel.js";
import Controller from "./Controller.js";

export default class TaskController extends Controller {
  constructor() {
    super();
    this.model = new TaskModel();
  }

  async create(req, res) {
    const task = req.body;
    try {
      await this.model.insertOne(task);
      this.success(res);
    } catch (error) {
      console.log(error);
      this.error(error, res, 400);
    }
  }
}
