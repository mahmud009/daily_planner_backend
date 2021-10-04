import TaskModel from "../model/TaskModel.js";
import { slackMessage } from "../service/SlackService.js";

export default class TaskController {
  constructor() {
    this.model = new TaskModel();
  }

  error(error, res, status) {
    console.log(error);
    res.send({ message: error.sqlMessage || error.message }).status(status);
  }
  success(res, message) {
    res.status(200).send({ message });
  }

  async create(req, res) {
    const task = req.body;
    try {
      await this.model.insertOne(task);
      await slackMessage({
        text: `TASK ADDED : ${req.body.name}`,
        channel: "#notifications",
      });
      this.success(res);
    } catch (error) {
      console.log(error);
      this.error(error, res, 400);
    }
  }
}
