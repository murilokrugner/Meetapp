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
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

// invocando o router
const routes = new Router();

// variavel para upload de arquivos
const upload = multer(multerConfig);

// rota para criar usuario
routes.post('/users', UserController.store);

// rota para fazer login de usuario
routes.post('/sessions', SessionController.store);

// definindo middleware global
routes.use(authMiddleware);

// upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

// rota para listagem de usuarios
routes.get('/providers', ProviderController.index);

// rota para agendar o serviço
routes.post('/appointments', AppointmentController.store);

// rota para listar os agendamentos do usuario logado
routes.get('/appointments', AppointmentController.index);

// cancelar agendamento
routes.delete('/appointments/:id', AppointmentController.delete);

// listar agenda do prestador de serviço
routes.get('/schedule', ScheduleController.index);

// listar notifcações do usuario
routes.get('/notification', NotificationController.index);

// marcar notificação como lida
routes.put('/notification/:id', NotificationController.update);

// rota para alterar dados usuario
routes.put('/users', UserController.update);

// exportando configurações
export default routes;
