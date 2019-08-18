exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex('example_table').del().then(
    () => knex('example_table').insert([
      { name: 'example 1', value: 0.2 },
      { name: 'example 2', value: 0.4 },
      { name: 'example 3', value: 0.6 },
    ]),
  );
};
