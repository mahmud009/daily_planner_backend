import * as mysql from "mysql";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config();

const env = process.env;

// creating connection pool
const db = mysql.createPool({
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
});

// ping db to test
export const pingDatabase = () =>
  Promise.resolve(
    db.getConnection((error) => {
      if (error) throw error;
      console.log("database connected successfully");
    })
  );

// helper export to run query
export const dbQuery = async (queryString: string, values?: any) => {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) => {
      if (error) reject(error);
      const callback = (
        error: mysql.MysqlError | null,
        response: mysql.OkPacket
      ) => {
        error && reject(error);
        !error && resolve(response);
      };

      values && connection.query(queryString, values, callback);
      !values && connection.query(queryString, callback);

      connection.query(queryString, function (error, response) {
        error && reject(error);
        !error && resolve(response);
        connection.release();
      });
    });
  });
};
