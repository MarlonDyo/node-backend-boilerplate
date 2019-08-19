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
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt); 
    if (data.email) {
      return knex(tableName)
      .where({ username })
      .update({
        password: passwordHash,
        email: data.email,
        updated_at: knex.fn.now(),
      }).returning('*'); 
    }
    else {
      return knex(tableName)
      .where({ username })
      .update({
        password: passwordHash,
        updated_at: knex.fn.now(),
      }).returning('*'); 
    }
  }
  else {
    if (data.email) {
      return knex(tableName)
      .update({
        email: data.email,
        updated_at: knex.fn.now(),
      })
      .where({ username })
      .returning('*'); 
    }
    else {
      return knex(tableName)
      .where({ username })
      .returning('*'); 
    }
  }
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
