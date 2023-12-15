import { Router } from 'express';
import Database from './database';

export default class BaseRoute {
  protected router: Router;
  private dbInstance: Database | undefined;

  constructor() {
    this.router = Router();
  }

  public getRoute(): Router {
    this.initRoutes();
    return this.router;
  }

  public getDatabase(): Database {
    if (!this.dbInstance) {
      this.dbInstance = new Database();
      // console.log('[I] !!! dbInstance is not initialized !!!');
      // throw new Error('[E] dbInstance is not initialized');
    }
    // console.log("=============");
    
    return this.dbInstance;
  }

  protected initRoutes(): void {
    // common routes...
  }
}
