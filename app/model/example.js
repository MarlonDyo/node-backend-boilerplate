const { check } = require('express-validator');
const knex = require('../../db/knex');

const validator = [
  check('name')
    .isLength({ min: 5 })
    .withMessage('O nome deve ter pelo menos 5 caracteres'),
  check('value')
    .isFloat({ min: 0, max: 10 })
    .withMessage('O valor deve estar entre 0 e 10'),
];

const tableName = 'example_table';

const createOperation = (data) => knex(tableName).insert({
  name: data.name,
  value: data.value,
}).returning('*');

const readOperation = (id) => knex(tableName)
  .where({ id })
  .returning('*');

const updateOperation = (id, data) => knex(tableName)
  .where({ id })
  .update({
    name: data.name,
    value: data.value,
    updated_at: knex.fn.now(),
  }).returning('*');

const deleteOperation = (id) => knex(tableName)
  .where({ id })
  .del()
  .returning('*');

const readAllOperation = () => knex(tableName).select();

module.exports = {
  validator,
  createOperation,
  readOperation,
  updateOperation,
  deleteOperation,
  readAllOperation,
};
