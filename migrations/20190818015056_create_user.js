
exports.up = function migrateUp(knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('username').primary();
    table.string('password').notNullable();
    table.string('email').unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function migrateDown(knex) {
  return knex.schema.dropTable('user');
};
