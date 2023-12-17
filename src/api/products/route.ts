import ProductController from '.';
import BaseRouter from '../../config/baseRouter';
import { Request, Response } from 'express';

class ProductRoute extends BaseRouter {
  private controller: ProductController;

  constructor() {
    super();
    this.controller = new ProductController();
    this.initRoutes();
  }

  public getRouterPath(): string {
    return '/products';
  }

  protected initRoutes(): void {
    this.router.get('/', this.getProduct.bind(this));
    this.router.get('/:id', this.getProductById.bind(this));
    this.router.post('/', this.createProduct.bind(this));
    this.router.put('/:id', this.updateProduct.bind(this));
    this.router.delete('/:id', this.deleteProduct.bind(this));
  }

  private async getProduct(req: Request, res: Response) {
    try {
      const result = await this.controller.getProduct();
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/products/index.ts/getProduct: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  private async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.controller.getProductById(parseInt(id));
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/products/index.ts/getProductById: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  private async createProduct(req: Request, res: Response) {
    try {
      const result = await this.controller.createProduct(req.body);
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/products/index.ts/createProduct: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  private async updateProduct(req: Request, res: Response) {
    try {
      const result = await this.controller.updateProduct(parseInt(req.params.id), req.body);
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/products/index.ts/updateProduct: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

  private async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.controller.deleteProduct(parseInt(id));
      res.send({ status: true, data: result, message: 'Query Successfull' });
    } catch (err) {
      console.log(`[E] at api/products/index.ts/deleteProduct: ${err}`);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  }

}

export default ProductRoute;