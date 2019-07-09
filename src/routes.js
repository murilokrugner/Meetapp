// importando router para roteamento das rotas
import { Router } from 'express';

// importando o multer e as configurações
import multer from 'multer';
import multerConfig from './config/multer';

// importando middleware
import authMiddleware from './app/middlewares/auth';

// importando constrollers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// invocando o router
const routes = new Router();

// variavel para upload de arquivos
const upload = multer(multerConfig);

// rota para criar usuario
routes.post('/users', UserController.store);

// rota para fazer login de usuario
routes.post('/sessions', SessionController.store);

// upload de arquivos
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

// definindo middleware global
routes.use(authMiddleware);

// rota para alterar dados usuario
routes.put('/users', UserController.update);

// exportando configurações
export default routes;
