exports.seed = function seed(knex) {
  // Deletes ALL existing entries
  return knex('user').del().then(
    () => knex('user').insert([
      { username: 'admin', password: '7FPhSx7y', email: 'example@hotmail.com' },
    ]),
  );
};
