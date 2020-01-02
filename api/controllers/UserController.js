import { User } from '../models'
import { handleError, handleSuccessOrErrorMessage } from './helpers'
import jwt from 'jsonwebtoken'
import passport from 'passport'

class UserController {
  static get(req, res) {
    const { id } = req.params
    return User.query()
      .where({ id })
      .first()
      .then(data => {
        const { id, firstName, lastName, email } = data
        return res.send({ user: { id, firstName, lastName, email } })
      })
      .catch(err => handleError(err, res))
  }

  // register
  static create(req, res, next) {
    return User.query()
      .insert(req.body)
      .then(data => {
        // login immediately on register success
        UserController.login(req, res)
      })
      .catch(err => handleError(err, res))
  }

  static update(req, res) {
    const {
      params: { id },
      body,
    } = req
    return User.query()
      .where({ id })
      .update(body)
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }

  static destroy(req, res) {
    const { id } = req.params
    return User.query()
      .where({ id })
      .del()
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }

  static login(req, res) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).send({
          message: info.message,
          user,
        })
      }

      const { id, firstName, lastName, email } = user
      const token = jwt.sign(
        { id, email },
        process.env.JWT_SECRET_OR_KEY,
        { expiresIn: process.env.JWT_EXPIRATION }
      )
      return res.send({ user: { id, firstName, lastName, email }, token })
    })(req, res)
  }

  static logout(req, res) {}
}

export default UserController
