// configure seu banco de dados

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'desafio02',
  password: 'desafio02',
  database: 'Meetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
