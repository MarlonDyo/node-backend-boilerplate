// Update with your config settings.
const { databaseUrl } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: databaseUrl,
    searchPath: ['public'],
  },

  production: {
    client: 'pg',
    connection: `${databaseUrl}?ssl=true`,
    searchPath: ['public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
