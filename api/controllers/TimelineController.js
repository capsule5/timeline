import { Timeline } from '../models'
import { handleError, handleSuccessOrErrorMessage } from './helpers'

class TimelineController {
  static all(req, res) {
    return Timeline.query()
      // .eager('events(eventsFilter)', {
      //   eventsFilter: (builder) => {
      //     builder.select('id')
      //   },
      // })
      .select([
        'timelines.*',
        Timeline.relatedQuery('events').count().as('eventsCount'),
      ])
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static get(req, res) {
    return Timeline.query()
      .findById(req.params.id)
      .eager('events')
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static create(req, res, next) {
    return Timeline.query()
      .insert(req.body)
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  }

  static update(req, res) {
    const {
      params: { id },
      body,
    } = req
    return Timeline.query()
      .where({ id })
      .update(body)
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }

  static destroy(req, res) {
    const { id } = req.params
    return Timeline.query()
      .where({ id })
      .del()
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  }
}

export default TimelineController
