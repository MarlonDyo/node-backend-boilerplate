
exports.up = function (knex) {
  knex.schema.createTable('example_table', (table) => {
    table.increments('id');
    table.string('name');
    table.float('value');
  })
    .then(() => console.log('Example table created'));
};

exports.down = function (knex) {
  knex.schema
    .dropTable('example_table');
};
