// importando o express
import express from 'express';

// importando o path
import path from 'path';

// importando arquivo de rotas
import routes from './routes';

import './database';

// criando uma classe para configuração do servidor
class App {
  constructor() {
    // atribuindo o express a var server
    this.server = express();

    // chamando os middlewares
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // configuração para enviar json
    this.server.use(express.json());
    // retornar arquivos estaticos
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // configuração das rotas pelo arquivos routes.js
    this.server.use(routes);
  }
}

// exportando o server
export default new App().server;
