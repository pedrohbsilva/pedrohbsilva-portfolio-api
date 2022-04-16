import express, { Application, NextFunction, Request, Response } from 'express';
import BodyParser from 'body-parser';
import 'reflect-metadata';
import cors from 'cors';
import routes from './shared/infra/http/routes';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.config();
    this.middlewares();
    this.server.use(routes);
  }

  private config(): void {
    this.server.use((_: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(BodyParser.json());
    this.server.use(BodyParser.urlencoded({ extended: true }));
  }
}

export default new App().server;
