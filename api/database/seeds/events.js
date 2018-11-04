exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('events').insert([
        {
          title: 'New event 1',
          date_year: 2000,
          date_month: 1,
          date_day: 28,
          date_reliability: 1,
        },
        {
          title: 'New event 2',
          date_year: 2000,
          date_month: 2,
          date_day: 28,
          date_reliability: 1,
        },
        {
          title: 'New event 3',
          date_year: 2000,
          date_month: 3,
          date_day: 28,
          date_reliability: 1,
        },
      ])
    })
}
