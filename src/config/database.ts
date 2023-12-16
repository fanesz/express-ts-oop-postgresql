import { Pool, QueryConfig, QueryResult as PGQueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export type QueryResult = {
  status: boolean;
  data: PGQueryResult;
  message: string;
}

class Database {
  private pool?: Pool;

  constructor() {
    this.pool = new Pool();
  }

  query(query: QueryConfig): Promise<QueryResult> {
    return new Promise((resolve, reject) => {

      if (!this.pool) {
        this.pool = new Pool();
      }

      this.pool?.query(query, (err, res) => {
        if (err) {
          const errMessage = err.stack?.match(/(?:error|Error): (.+)/i)?.[1] || "Unknown error";
          reject(errMessage);
        } else {
          resolve({ status: true, data: res, message: "Query Successfull" });
        }
      });
    });
  }

}

export default Database;
