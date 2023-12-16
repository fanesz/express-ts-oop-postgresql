import { Request, Response } from 'express';
import { Pool, QueryResult } from 'pg';

class CategoryController {
  private pool: Pool;

  constructor(dbInstance: any) {
    this.pool = dbInstance.getPool();
  }

  async getCategory(req: Request, res: Response) {
    try {
      this.pool?.query('SELECT * FROM categories;', (err: Error, queryRes: QueryResult) => {
        if (err) {
          res.send({ status: false, message: err.stack });
        } else {
          res.send({ status: true, data: queryRes, message: "Query Successful" });
        }
      }
      );
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: 'Internal Server Error' });
    }
  }
}

export default CategoryController;
