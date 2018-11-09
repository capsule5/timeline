import { Model } from 'objection'
import BaseModel from './BaseModel'

class Event extends BaseModel {
  static get tableName() {
    return 'events'
  }

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

  static get relationMappings() {
    const Story = require('./Story')

    return {
      story: {
        relation: Model.BelongsToOneRelation,
        modelClass: Story,
        join: {
          from: 'events.stories_id',
          to: 'stories.id',
        },
      },
    }
  }
}

module.exports = Event
