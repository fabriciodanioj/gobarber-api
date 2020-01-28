import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.send({ msg: 'Hello World' }));

export default routes;
