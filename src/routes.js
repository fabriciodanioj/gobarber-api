import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
