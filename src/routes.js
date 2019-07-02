// importando router para roteamento das rotas
import { Router } from 'express';

// importando middleware
import authMiddleware from './app/middlewares/auth';

// importando constrollers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// invocando o router
const routes = new Router();

// rota para criar usuario
routes.post('/users', UserController.store);

// rota para fazer login de usuario
routes.post('/sessions', SessionController.store);

// definindo middleware global
routes.use(authMiddleware);

// rota para alterar dados usuario
routes.put('/users', UserController.update);

// exportando configurações
export default routes;
