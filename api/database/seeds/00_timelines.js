exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('timelines')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('timelines').insert([
        {
          title: 'Mathematics',
        },
        {
          title: 'Physics',
        },
      ])
    })
}
