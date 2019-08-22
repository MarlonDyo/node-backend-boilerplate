const { dbCreate } = require('../db/user');

const tableName = 'user';

exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex(tableName).del().then(() => {
    const body = [
      {
        username: 'admin',
        password: '7FPhSx7y',
        email: 'example@hotmail.com',
      },
    ];
    return Promise.all(
      body.map((item) => dbCreate(item)),
    );
  });
};
