const { Story } = require('../models')

module.exports = {
  all: function(req, res) {
    return (
      Story.query()
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
    )
  },

  get: function(req, res) {
    return Story.query()
      .findById(req.params.id)
      .eager('events')
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  },

  create: function(req, res, next) {
    return Story.query()
      .insert(req.body)
      .then(data => res.send(data))
      .catch(err => handleError(err, res))
  },

  update: function(req, res) {
    const {
      params: { id },
      body,
    } = req
    return Story.query()
      .where({ id })
      .update(body)
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  },

  destroy: function(req, res) {
    const { id } = req.params
    return Story.query()
      .where({ id })
      .del()
      .then(data => handleSuccessOrErrorMessage(data, res))
      .catch(err => handleError(err, res))
  },
}

const handleError = (err, res) => {
  console.log('[stab]', { err })
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
