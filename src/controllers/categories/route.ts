import BaseRoute from '../../config/baseRouter';
import CategoryController from '.';

export default class CategoryRoute extends BaseRoute {
  private routerPath: string = '/categories';
  private controller;

  constructor() {
    super();
    this.controller = new CategoryController(this.getDatabase());
  }

  protected initRoutes(): void {
    this.router.get('/', this.controller.getCategory);
  }

  public getRouterPath(): string {
    return this.routerPath;
  }
}
