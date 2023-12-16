import express, { Request, Response } from 'express';
import Database from './config/database';
import CategoryRoute from './api/categories/route';

export default class App {
  public app: express.Application;
  private port: number;
  private dbInstance: Database = new Database();

  constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  public async initDB() {
    try {
      const result = await this.dbInstance.query({ text: "SELECT current_database()" });
      console.log("[I] Connected to Database:", result.data.rows[0].current_database);
    } catch (error) {
      console.error("[E] at app.ts:", error);
    }
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(c => {
      this.app.use(c.getRouterPath(), c.getRoute());
    });
  }

  public listen() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    });
    this.app.listen(this.port, () => {
      console.log("[I] App listening on the port:", this.port, "| http://localhost:" + this.port);
    });
  }
}

const app = new App({
  port: 3000,
  controllers: [
    new CategoryRoute(),
  ],
  middleWares: [
    express.json(),
    express.urlencoded({ extended: true }),
  ]
});
console.log("====================================");
app.initDB();
app.listen();
