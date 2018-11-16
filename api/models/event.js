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
        date_month: { type: [ 'integer', 'null' ], minimum: 1, maximum: 12 },
        date_day: { type: [ 'integer', 'null' ], minimum: 1, maximum: 31 },
        date_reliability: { type: 'integer', minimum: 1, maximum: 3 },
      },
    }
  }

  static get relationMappings() {
    const Timeline = require('./Timeline')

    return {
      timeline: {
        relation: Model.BelongsToOneRelation,
        modelClass: Timeline,
        join: {
          from: 'events.timelines_id',
          to: 'timelines.id',
        },
      },
    }
  }
}

module.exports = Event
