import { Request, Response } from 'express';

class CategoryController {
  private query: Function;

  constructor(query: Function) {
    this.query = query;
  }

  async getCategory(req: Request, res: Response) {
    try {
      const query = {
        text: 'SELECT * FROM categories',
      };

      const result = await this.query(query);
      res.send({ status: true, data: result.data.rows, message: 'Query Successfull' });

    } catch (err) {
      console.log(`[E] at api/categories/index.ts: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }
}

export default CategoryController;
