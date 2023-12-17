import { Router } from 'express';
import express from 'express';
import Database from './database';

export default class BaseRouter {
  protected router: Router;
  protected routeList: any[] = [];

  constructor() {
    this.router = Router();
  }

  public getRoute(): Router {
    this.initRoutes();
    return this.router;
  }

  getRouteList(): any[] {
    return this.routeList;
  }

  protected initRoutes(): void {
    // common routes...
  }
}
