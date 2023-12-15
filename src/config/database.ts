import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private pool: Pool;

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
    this.pool.connect((err, client, release) => {
      if (err) {
        callback(false, err.stack);
      }
      callback(true, 'Connected to database: ' + process.env.DB_NAME);
    });
  }

  getPool() {
    return this.pool;
  }

  test() {
    return 'Database class';
  }
}

export default Database;
