const { dbCreate } = require('../db/user');

exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex('user').del().then(() => {
    const body = { username: 'admin', password: '7FPhSx7y', email: 'example@hotmail.com' };
    return dbCreate(body);
  });
};
