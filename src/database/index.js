import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      // associando model user com model file
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // configuração do banco mongo
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/meetup',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
