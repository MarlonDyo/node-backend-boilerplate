const knex = require('./knex');

const tableName = 'example_table';

const dbCreate = (data) => knex(tableName).insert(data).returning('*');

const dbRead = (id) => knex(tableName)
  .where({ id })
  .returning('*');

const dbUpdate = (id, data) => {
  data.updated_at = knex.fn.now();
  knex(tableName)
    .where({ id })
    .update(data).returning('*');
};

const dbDelete = (id) => knex(tableName)
  .where({ id })
  .del()
  .returning('*');

const dbReadAll = () => knex(tableName).select();

module.exports = {
  dbCreate,
  dbRead,
  dbUpdate,
  dbDelete,
  dbReadAll,
};
