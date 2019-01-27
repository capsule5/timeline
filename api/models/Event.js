import { Model } from 'objection'
import BaseModel from './BaseModel'
import Timeline from './Timeline'

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
        dateYear: { type: 'integer' },
        dateMonth: { type: 'integer', minimum: 1, maximum: 12, nullable: true },
        dateDay: { type: 'integer', minimum: 1, maximum: 31, nullable: true },
        dateReliability: { type: 'integer', minimum: 1, maximum: 3 },
      },
    }
  }

  static get relationMappings() {

    return {
      timeline: {
        relation: Model.BelongsToOneRelation,
        modelClass: Timeline,
        join: {
          from: 'events.timelinesId',
          to: 'timelines.id',
        },
      },
    }
  }
}

export default Event
