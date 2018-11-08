const { Model } = require('objection')
const knex = require('../config/database')

Model.knex(knex)

class Story extends Model {
  static get tableName() {
    return 'stories'
  }

  // https://cswr.github.io/JsonSchema/spec/basic_types/
  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'title' ],
      properties: {
        title: { type: 'string', minLength: 3, maxLength: 255 },
      },
    }
  }

  static get relationMappings() {
    const Event = require('./event')
    
    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'stories.id',
          to: 'events.stories_id',
        },
      },
    }
  }
}

module.exports = Story
