import config from 'config';

module.exports = {
  client: 'pg',
  connection: {
    database: config.get('database.name'),
    user: config.get('database.connection.user'),
    password: config.get('database.connection.password'),
  },


};
