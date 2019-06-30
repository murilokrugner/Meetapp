// importando o express
import express from 'express';

// importando arquivo de rotas
import routes from './routes';

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
  }

  routes() {
    // configuração das rotas pelo arquivos routes.js
    this.server.use(routes);
  }
}

// exportando o server
export default new App().server;
