const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('timelines')
    .del()
    .then(function() {
      const fakes = []
      for (let index = 0; index < 10; index++) {
        fakes.push({
          title: faker.commerce.department(),
          colorBg: faker.internet.color(),
          usersId: faker.random.number({ min: 1, max: 3 }),
          isPublic: faker.random.number({ min: 0, max: 1 }),
        })
      }
      // Inserts seed entries
      return knex('timelines').insert(fakes)
    })
}
