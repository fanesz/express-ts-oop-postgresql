import { Request, Response } from 'express';
import Database from '../../config/database';

export default class CategoryController {
  private client: any;
  private release: any;

  constructor(database: any) {
    this.client = database.getClient();
    this.release = database.getRelease();
  }

  public getCategory(req: Request, res: Response) {
    // console.log(this.db.test());
    this.client?.query('SELECT 1+1 as test;', (err: any, result: any) => {
      this.release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Database connected');
    });

    return

    // this.db.getPool().query('SELECT * FROM categories', (err: any, result: any) => {
    //   if (err) {
    //     // Handle error
    //     console.error('Error executing query:', err);
    //     res.status(500).json({ error: 'Error fetching categories' });
    //   } else {
    //     // Process the result
    //     const categories = result.rows; // Assuming the result contains categories

    //     // Send categories as a response
    //     res.status(200).json({ categories });
    //   }
    // });
  }
}
