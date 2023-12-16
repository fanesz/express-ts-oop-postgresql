import { Pool, QueryConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface CustomError extends Error {
  stack?: string;
}


class Database {
  private pool: Pool | null;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  connect(callback: Function) {
    this.pool?.connect((err, client, release) => {
      if (err) {
        callback(false, err.stack);
      } else {
        callback(true, 'Connected to database: ' + process.env.DB_NAME);
      }
      release();
    });
  }

   private extractErrorMessage(err: CustomError): string {
    if (err && err.stack) {
      const stackLines = err.stack.split('\n');
      const errorMessageLine = stackLines.find(line => line.includes('error:'));
      if (errorMessageLine) {
        const errorMessage = errorMessageLine.trim();
        return errorMessage.split("error: ")[1];
      }
    }
    return "Unknown error";
  }

  query(queryConfig: QueryConfig, callback: (success: boolean, queryRes: QueryResult | string) => void) {
    this.pool?.query(queryConfig, (err: Error, queryRes) => {
      if (err) {
        callback(false, this.extractErrorMessage(err));
      } else {
        callback(true, queryRes);
      }
    });
  }
}

export default Database;
