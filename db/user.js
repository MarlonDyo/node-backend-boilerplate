const bcrypt = require('bcryptjs');
const knex = require('./knex');

const tableName = 'user';

const dbCreate = async (data) => {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  return knex(tableName).insert(data).returning('*');
};

const dbReadByUsername = (username) => knex(tableName)
  .where({ username })
  .returning('*');

const dbReadByEmail = (email) => knex(tableName)
  .where({ email })
  .returning('*');

const dbUpdate = async (username, data) => {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
  }
  data.updated_at = knex.fn.now()
  return knex(tableName)
    .where({ username })
    .update(data).returning('*');
};

const dbDelete = (username) => knex(tableName)
  .where({ username })
  .del()
  .returning('*');

const dbReadAll = () => knex(tableName).select();

const dbIsValidPassword = async (
  passwordHash,
  testPassword,
) => bcrypt.compare(testPassword, passwordHash);

module.exports = {
  dbCreate,
  dbReadByUsername,
  dbReadByEmail,
  dbUpdate,
  dbDelete,
  dbReadAll,
  dbIsValidPassword,
};
