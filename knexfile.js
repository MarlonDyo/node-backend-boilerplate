// Update with your config settings.
const { databaseUrl, testDatabaseUrl } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: databaseUrl,
    searchPath: ['public'],
  },

  test: {
    client: 'pg',
    connection: testDatabaseUrl,
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
