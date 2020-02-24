import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(AuthMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.get('/providers', ProviderController.index);

export default routes;
