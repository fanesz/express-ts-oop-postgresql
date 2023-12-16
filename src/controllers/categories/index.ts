import { Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';

class CategoryController {
  private database: any;

  constructor(dbInstance: any) {
    this.database = dbInstance
  }

  async getCategory(req: Request, res: Response) {
    try {
      this.database.connect((connected: boolean, message: string) => {
        if (connected) {
          const queryConfig: QueryConfig = {
            text: 'SELECT * FROM categories;',
          };

          this.database.query(queryConfig, (success: boolean, queryRes: QueryResult | Error) => {
            if (success) {
              res.send({ status: true, data: queryRes, message: "Query Successful" });
            } else {
              res.send({ status: false, message: queryRes });
            }
          });
        } else {
          res.send({ status: false, message: message });
        }
      });
    } catch (error) {
      console.error(error);
      res.send({ status: false, message: 'Internal Server Error' });
    }
  }
}

export default CategoryController;
