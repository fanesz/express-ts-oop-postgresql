import { Request, Response } from 'express';
import Database from '../../config/database';
import CategoryModel from './model';

class CategoryController extends Database {

  constructor() {
    super();
  }

  async getCategory(req: Request, res: Response) {
    try {
      const query = {
        text: 'SELECT * FROM categories',
      };

      const result: CategoryModel[] = (await this.query(query)).data.rows;
      res.send({ status: true, data: result, message: 'Query Successfull' });

    } catch (err) {
      console.log(`[E] at api/categories/index.ts: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }
}

export default CategoryController;
