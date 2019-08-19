module.exports = {
  environment: process.env.ENVIRONMENT || 'development',
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/my_db',
  jwtSecret: 'uQ5T38YaXmxAdzTwnmm7HSwPTAV4dHNrPzhkByRpBH8WaZFjK9',
};
