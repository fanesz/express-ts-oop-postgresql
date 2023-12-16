import { Router } from 'express';
import Database from './database';

export default class BaseRoute {
  protected router: Router;
  private dbInstance: Database | undefined;

  constructor() {
    this.router = Router();
    this.dbInstance = new Database();
  }

  public getRoute(): Router {
    this.initRoutes();
    return this.router;
  }

  public getDatabase(): Database {
    if (!this.dbInstance) {
      this.dbInstance = new Database();
    }
    return this.dbInstance;
  }

  protected initRoutes(): void {
    // common routes...
  }
}
