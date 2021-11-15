import * as mysql from "mysql";

// creating connection pool
const db = mysql.createPool({
  host: "bvrpyasy7ax4prue5bzo-mysql.services.clever-cloud.com",
  database: "bvrpyasy7ax4prue5bzo",
  user: "u7fssfj3szeg0wha",
  password: "dGBL5aobdAZ4qjb2HD9t",
});

// ping db to test
db.getConnection((error, connection) => {
  if (error) throw error;
  console.log("Database connected successfully");
  connection.release();
});

// helper export to run query
export const dbQuery = async (queryString: string) => {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) => {
      if (error) reject(error);
      connection.query(queryString, function (error, response) {
        error && reject(error);
        !error && resolve(response);
        connection.release();
      });
    });
  });
};
