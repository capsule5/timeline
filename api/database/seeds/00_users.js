const faker = require('faker')
const bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      const fakes = []
      const password = bcrypt.hashSync('xxxxxx', bcrypt.genSaltSync(10))
      fakes.push(
        {
          email: 'test@test.com',
          password,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
        {
          email: 'test2@test.com',
          password,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
        {
          email: 'test3@test.com',
          password,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        }
      )
      // Inserts seed entries
      return knex('users').insert(fakes)
    })
}
