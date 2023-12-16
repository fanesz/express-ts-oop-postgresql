import CategoryController from '.';
import BaseRoute from '../../config/baseRouter';

export default class CategoryRoute extends BaseRoute {
  private routerPath: string = '/categories';
  private controller: CategoryController;

  constructor() {
    super();
    this.controller = new CategoryController(this.getDatabase());
  }

  protected initRoutes(): void {
    this.router.get('/', this.controller.getCategory.bind(this.controller));
  }

  public getRouterPath(): string {
    return this.routerPath;
  }
}
