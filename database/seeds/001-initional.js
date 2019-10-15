
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'pass'},
        {username: 'user2', password: 'pass'},
        {username: 'user3', password: 'pass'}
      ]);
    });
};
