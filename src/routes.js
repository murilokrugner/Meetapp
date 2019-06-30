//importando router para roteamento das rotas
import { Router } from 'express';

//invocando o router
const routes = new Router();

//definindo rotas
routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World'});
})

//exportando configurações
export default routes;