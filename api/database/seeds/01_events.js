exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('events').insert([
        {
          title: 'Invention du nombre',
          date_year: -3000,
          date_reliability: 1,
          timelines_id: '1',
        },
        {
          title: 'Eclipse predite par thales',
          date_year: -584,
          date_month: 5,
          date_day: 28,
          date_reliability: 3,
          timelines_id: '1',
        },
        {
          title: 'Calcul de la circonférence de la Terre par Eratosthene',
          date_year: -200,
          date_reliability: 1,
          timelines_id: '1',
        },
        {
          title: 'Publication de relativité générale d’Einstein',
          date_year: 1915,
          date_reliability: 3,
          timelines_id: '2',
        },
      ])
    })
}
