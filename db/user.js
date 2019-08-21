const bcrypt = require('bcryptjs');
const knex = require('./knex');

const tableName = 'user';

const dbCreate = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(data.password, salt);
  return knex(tableName).insert({
    username: data.username,
    password: passwordHash,
    email: data.email,
  }).returning('*');
};

const dbReadByUsername = (username) => knex(tableName)
  .where({ username })
  .returning('*');

const dbReadByEmail = (email) => knex(tableName)
  .where({ email })
  .returning('*');

const dbUpdate = async (username, data) => {
  let passwordHash;
  let newEmail;
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(data.password, salt);
  }
  if (data.email) {
    newEmail = data.email;
  }
  return knex(tableName)
    .where({ username })
    .update({
      password: passwordHash,
      email: newEmail,
      updated_at: knex.fn.now(),
    }).returning('*');
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
