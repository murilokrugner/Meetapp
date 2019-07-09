// configure seu banco de dados

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'meetup',
  database: 'Meetup',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
