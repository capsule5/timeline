import BaseModel from './BaseModel'
import { Model } from 'objection'
import Event from './Event'
import User from './User'

class Timeline extends BaseModel {
  static get tableName() {
    return 'timelines'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'title', 'usersId' ],
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
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'timelines.usersId',
          to: 'users.id',
        },
      },
    }
  }
}

export default Timeline
