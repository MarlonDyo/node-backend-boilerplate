const environment = process.env.ENVIRONMENT || 'development';
const port = process.env.PORT || 3000;
const testDatabaseUrl = process.env.TEST_DATABASE_URL || 'postgresql://username:password@localhost:5432/test_db';
const databaseUrl = process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/my_db';
const jwtSecret = 'uQ5T38YaXmxAdzTwnmm7HSwPTAV4dHNrPzhkByRpBH8WaZFjK9';

module.exports = {
  environment,
  port,
  testDatabaseUrl,
  databaseUrl,
  jwtSecret,
};
