import CategoryController from '.';
import BaseRouter from '../../config/baseRouter';
import { Request, Response } from 'express';

class CategoryRoute extends BaseRouter {
  private controller: CategoryController;

  constructor() {
    super();
    this.controller = new CategoryController();
    this.initRoutes();
  }

  public getRouterPath(): string {
    return '/categories';
  }

  protected initRoutes(): void {
    this.router.get('/', this.getCategory.bind(this));
    this.router.get('/:id', this.getCategoryById.bind(this));
    this.router.post('/', this.createCategory.bind(this));
    this.router.put('/:id', this.updateCategory.bind(this));
    this.router.delete('/:id', this.deleteCategory.bind(this));
  }

  async getCategory(req: Request, res: Response) {
    try {
      const result = await this.controller.getCategory();
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/categories/index.ts/getCategory: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.controller.getCategoryById(parseInt(id));
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/categories/index.ts/getCategoryById: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const result = await this.controller.createCategory(name, description);
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/categories/index.ts/createCategory: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const result = await this.controller.updateCategory(parseInt(id), name, description);
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/categories/index.ts/updateCategory: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.controller.deleteCategory(parseInt(id));
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/categories/index.ts/deleteCategory: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

}

export default CategoryRoute;
