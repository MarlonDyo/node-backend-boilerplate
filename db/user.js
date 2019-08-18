const knex = require('./knex');

const tableName = 'user';

const dbCreate = (data) => knex(tableName).insert({
  username: data.username,
  password: data.password,
  email: data.email,
}).returning('*');

const dbReadByUsername = (username) => knex(tableName)
  .where({ username })
  .returning('*');

const dbReadByEmail = (email) => knex(tableName)
  .where({ email })
  .returning('*');

const dbUpdate = (username, data) => knex(tableName)
  .where({ username })
  .update({
    password: data.password,
    email: data.email,
    updated_at: knex.fn.now(),
  }).returning('*');

const dbDelete = (username) => knex(tableName)
  .where({ username })
  .del()
  .returning('*');

const dbReadAll = () => knex(tableName).select();

module.exports = {
  dbCreate,
  dbReadByUsername,
  dbReadByEmail,
  dbUpdate,
  dbDelete,
  dbReadAll,
};
