import BaseModel from './BaseModel'
import { Model } from 'objection'

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
}

export default User
