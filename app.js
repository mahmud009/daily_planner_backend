import "./database/connection.js";
import express from "express";
import { config as envConfig } from "dotenv";
import cors from "cors";
import TaskController from "./controller/TaskController.js";

// Initializing app
envConfig();
const app = express();
const PORT = process.env.PORT || 3120;

// Using middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// registering controllers
const taskController = new TaskController();
// Handling routes
app.post("/task/new", taskController.create.bind(taskController));

// App listener
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
