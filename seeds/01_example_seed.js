const { dbCreate } = require('../db/example');
const tableName = 'example_table'

exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex(tableName).del().then(() => {
    const body = [
      { name: 'example 1', value: 0.2 },
      { name: 'example 2', value: 0.4 },
      { name: 'example 3', value: 0.6 },
    ];
    return Promise.all(
      body.map((item) => dbCreate(item)),
    );
  });
};
