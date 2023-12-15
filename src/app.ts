import express, { Request, Response } from 'express';
import Database from './config/database';
import CategoryRoute from './controllers/categories/route';

export default class App {
  public app: express.Application;
  private port: number;
  private db;

  constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
    this.app = express();
    this.port = appInit.port;
    this.db = new Database();

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  public initDB() {
    this.db.connect((status: string, message: string) => {
      if (!status) {
        throw new Error('[E] DB connection failed\n' + message);
      } else {
        console.log('[I] DB connection successful\n--> ' + message);
      }
    });
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
      console.log(`App listening on the port ${this.port}`);
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

app.initDB();
setTimeout(() => {
  app.listen();
}, 2000);
