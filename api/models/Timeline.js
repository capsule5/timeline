import BaseModel from './BaseModel'
import { Model } from 'objection'
import Event from './Event'

class Timeline extends BaseModel {
  static get tableName() {
    return 'timelines'
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

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        // filter: query => query.select('id', 'title'),
        join: {
          from: 'timelines.id',
          to: 'events.timelinesId',
        },
      },
    }
  }
}

export default Timeline
