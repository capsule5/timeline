// https://cswr.github.io/JsonSchema/spec/basic_types/
import { Model } from 'objection'
import knex from '../config/database'
import bcrypt from 'bcrypt'

Model.knex(knex)

class BaseModel extends Model {
  $beforeValidate(jsonSchema, json, opt) {
    // converts all integer typed in jsonSchema from string to int
    Object.keys(json).forEach(function(key) {
      const prop = jsonSchema.properties[key]
      if (prop && prop.type === 'integer') {
        json[key] = parseInt(json[key])
      }
    })
  }

  $beforeInsert(context) {
    super.$beforeInsert(context)
    const { password } = this
    if (password) {
      this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
  }
}

export default BaseModel
