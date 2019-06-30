// importando router para roteamento das rotas
import { Router } from 'express';

// importando models User/
import User from './app/models/User';
// invocando o router
const routes = new Router();

// rota de teste
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Murilo Krugner',
    email: 'murilokrugner@hotmail.com',
    password_hash: '123456789',
  });

  return res.json(user);
});

// exportando configurações
export default routes;
