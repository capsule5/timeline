const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function() {
      const fakes = []
      for (let index = 0; index < 100; index++) {
        fakes.push({
          title: faker.lorem.sentence(),
          date_year: faker.random.number({ min: 2008, max: 2018 }),
          date_month: faker.random.number({ min: 1, max: 6 }),
          date_day: faker.random.number({ min: 1, max: 6 }),
          date_reliability: faker.random.number({ min: 1, max: 3 }),
          timelines_id: faker.random.number({ min: 1, max: 10 }),
        })
      }
      for (let index = 0; index < 100; index++) {
        fakes.push({
          title: faker.lorem.sentence(),
          date_year: faker.random.number({ min: 2010, max: 2018 }),
          date_month: faker.random.number({ min: 1, max: 12 }),
          date_reliability: faker.random.number({ min: 1, max: 3 }),
          timelines_id: faker.random.number({ min: 1, max: 10 }),
        })
      }
      for (let index = 0; index < 30; index++) {
        fakes.push({
          title: faker.lorem.sentence(),
          date_year: faker.random.number({ min: 2000, max: 2018 }),
          date_reliability: faker.random.number({ min: 1, max: 3 }),
          timelines_id: faker.random.number({ min: 1, max: 10 }),
        })
      }
      // Inserts seed entries
      return knex('events').insert(fakes)
    })
}
