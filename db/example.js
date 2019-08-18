const knex = require('./knex');
const tableName = 'example_table';

const dbCreate = (data) => knex(tableName).insert({
  name: data.name,
  value: data.value,
}).returning('*');

const dbRead = (id) => knex(tableName)
  .where({ id })
  .returning('*');

const dbUpdate = (id, data) => knex(tableName)
  .where({ id })
  .update({
    name: data.name,
    value: data.value,
    updated_at: knex.fn.now(),
  }).returning('*');

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
