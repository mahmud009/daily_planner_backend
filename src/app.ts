import express, { Application, Request, Response, NextFunction } from "express";
import { userRoutes } from "./routes/user.route";
const router = express.Router();

const port: number = 3120;
const app: Application = express();
app.use(express.json());

// App routes
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server running at port : ${port}`);
});

process.on("uncaughtException", (err) => console.log(err));
