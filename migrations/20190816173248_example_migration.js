
exports.up = function migrateUp(knex) {
  return knex.schema.createTable('example_table', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.float('value').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function migrateDown(knex) {
  return knex.schema.dropTable('example_table');
};
