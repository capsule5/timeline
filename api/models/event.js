const { Model } = require('objection')
const knex = require('../config/database')

Model.knex(knex)

class Event extends Model {
  static get tableName() {
    return 'events'
  }

  // https://cswr.github.io/JsonSchema/spec/basic_types/
  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'title' ],
      properties: {
        title: { type: 'string', minLength: 3, maxLength: 255 },
        date_year: { type: 'integer' },
        date_month: { type: 'integer', minimum: 1, maximum: 12 },
        date_day: { type: 'integer', minimum: 1, maximum: 31 },
        date_reliability: { type: 'integer', minimum: 1, maximum: 3 },
      },
    }
  }

  $beforeValidate(jsonSchema, json, opt) {
    // converts all integer typed value from string to int
    // TODO: clean that!
    Object.keys(json).forEach(function(key) {
      const prop = jsonSchema.properties[key]
      if (prop && prop.type === 'integer') {
        json[key] = parseInt(json[key])
      }
    })
  }
}

module.exports = Event
