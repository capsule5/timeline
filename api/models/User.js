import BaseModel from './BaseModel'
import { Model } from 'objection'
import Timeline from './Timeline'

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'email', 'password' ],
      properties: {
        email: { type: 'string', minLength: 3, maxLength: 50 },
        password: { type: 'string', minLength: 6 },
      },
    }
  }

  static get relationMappings() {
    return {
      timelines: {
        relation: Model.HasManyRelation,
        modelClass: Timeline,
        join: {
          from: 'users.id',
          to: 'timelines.usersId',
        },
      },
    }
  }
}

export default User
