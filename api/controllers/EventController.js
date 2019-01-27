import { Event } from '../models'
import { handleError, handleSuccessOrErrorMessage } from './helpers'

class EventController {
  static all(req, res) {
    return Event.query()
      .orderBy('dateYear', 'asc')
      .orderBy('dateMonth', 'asc')
      .orderBy('dateDay', 'asc')
      .eager('timeline')
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static someByTimelinesIds(req, res) {
    const { ids } = req.query
    return Event.query()
      .whereIn('timelinesId', JSON.parse(ids))
      .orderBy('dateYear', 'asc')
      .orderBy('dateMonth', 'asc')
      .orderBy('dateDay', 'asc')
      .eager('timeline')
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static get(req, res) {
    const { id } = req.params
    return Event.query()
      .where({ id })
      .first()
      .eager('timeline')
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static create(req, res, next) {
    return Event.query()
      .insert(req.body)
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static update(req, res) {
    const {
      params: { id },
      body,
    } = req
    return Event.query()
      .where({ id })
      .update(body)
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }

  static destroy(req, res) {
    const { id } = req.params
    return Event.query()
      .where({ id })
      .del()
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }
}

export default EventController
