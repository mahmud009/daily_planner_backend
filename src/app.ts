import { dbQuery } from "./database/connection";

dbQuery("SELECT * FROM tasks").then((res) => console.log(res));
