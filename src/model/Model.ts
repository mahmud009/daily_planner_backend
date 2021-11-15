import { dbQuery, pingDatabase } from "../database/database";
import { OkPacket } from "mysql";

export class Model {
  static async PingDatabase() {
    try {
      await pingDatabase();
    } catch (error) {
      console.log(error);
    }
  }

  async runQuery(query: string, values?: any): Promise<OkPacket> {
    return (await dbQuery(query, values)) as OkPacket;
  }
}

Model.PingDatabase();
