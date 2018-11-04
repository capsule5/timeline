const { Event } = require('../models')

module.exports = {
  all: function(req, res) {
    return Event.query()
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  },

  get: function(req, res) {
    const { id } = req.params
    return Event.query()
      .where({ id })
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  },

  create: function(req, res, next) {
    return Event.query()
      .insert(req.body)
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  },

  update: function(req, res) {
    const {
      params: { id },
      body,
    } = req
    return Event.query()
      .where({ id })
      .update(body)
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  },

  destroy: function(req, res) {
    const { id } = req.params
    return Event.query()
      .where({ id })
      .del()
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  },
}

const handleError = (err, res) => {
  res.status(err.statusCode || '500').send(err)
}

const handleSuccessOrErrorMessage = (data, res) => {
  let response
  if (data != 0) {
    response = { result: 'success' }
  } else {
    response = { msg: 'No Result Found' }
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(response))
}
