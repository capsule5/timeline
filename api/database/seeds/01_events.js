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
          dateYear: faker.random.number({ min: 2008, max: 2018 }),
          dateMonth: faker.random.number({ min: 1, max: 6 }),
          dateDay: faker.random.number({ min: 1, max: 6 }),
          dateReliability: faker.random.number({ min: 1, max: 3 }),
          timelinesId: faker.random.number({ min: 1, max: 10 }),
        })
      }
      for (let index = 0; index < 100; index++) {
        fakes.push({
          title: faker.lorem.sentence(),
          dateYear: faker.random.number({ min: 2010, max: 2018 }),
          dateMonth: faker.random.number({ min: 1, max: 12 }),
          dateReliability: faker.random.number({ min: 1, max: 3 }),
          timelinesId: faker.random.number({ min: 1, max: 10 }),
        })
      }
      for (let index = 0; index < 30; index++) {
        fakes.push({
          title: faker.lorem.sentence(),
          dateYear: faker.random.number({ min: 2000, max: 2018 }),
          dateReliability: faker.random.number({ min: 1, max: 3 }),
          timelinesId: faker.random.number({ min: 1, max: 10 }),
        })
      }
      // Inserts seed entries
      return knex('events').insert(fakes)
    })
}
