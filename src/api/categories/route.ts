import CategoryController from '.';
import BaseRouter from '../../config/baseRouter';

export default class CategoryRoute extends BaseRouter {
  private routerPath: string = '/categories';
  private controller: CategoryController;

  constructor() {
    super();
    this.controller = new CategoryController(this.query);
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get('/', this.controller.getCategory.bind(this.controller));
  }

  public getRouterPath(): string {
    return this.routerPath;
  }
}
