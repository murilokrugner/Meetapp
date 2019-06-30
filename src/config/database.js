// configure seu banco de dados

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'desafio02',
  database: 'Meetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
