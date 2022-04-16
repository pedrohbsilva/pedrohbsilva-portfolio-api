import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import v1 from './v1';
import * as swaggerFile from '../../../../document.json';

class ApiRouter {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.allRoutes();
  }

  public allRoutes(): void {
    this.routes.use('/api/v1', [v1]);
    this.routes.route('/healthCheck').get((_: Request, res: Response) => {
      return res.status(200).send({ message: 'on' });
    });
    this.routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }
}

export default new ApiRouter().routes;
