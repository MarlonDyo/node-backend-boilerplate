// Update with your config settings.
const { databaseUrl } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: databaseUrl,
  },

  staging: {
    client: 'pg',
    connection: databaseUrl,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: databaseUrl,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
