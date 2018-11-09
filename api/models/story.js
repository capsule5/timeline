import BaseModel from './BaseModel'
import { Model } from 'objection'

class Story extends BaseModel {
  static get tableName() {
    return 'stories'
  }

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
    const Event = require('./Event')

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
