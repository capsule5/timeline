import { Story } from '../models'
import { handleError, handleSuccessOrErrorMessage } from './helpers'

class StoryController {
  static all(req, res) {
    return Story.query()
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static get(req, res) {
    return Story.query()
      .findById(req.params.id)
      .eager('events')
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static create(req, res, next) {
    return Story.query()
      .insert(req.body)
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static update(req, res) {
    const {
      params: { id },
      body,
    } = req
    return Story.query()
      .where({ id })
      .update(body)
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }

  static destroy(req, res) {
    const { id } = req.params
    return Story.query()
      .where({ id })
      .del()
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }
}

export default StoryController