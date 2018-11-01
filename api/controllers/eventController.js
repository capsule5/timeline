const knex = require('knex')(require('../database/knexfile'))

module.exports = {
  all: function(req, res) {
    return knex('events')
      .then(data => res.send(data))
      .catch(err => res.status('500').send(err))
  },

  get: function(req, res) {
    const { id } = req.params
    return knex('events')
      .where({ id })
      .then(data => res.send(data))
      .catch(err => res.status('500').send(err))
  },

  create: function(req, res, next) {
    const { title } = req.body
    return knex('events')
      .insert({ title })
      .then(data => res.send(data))
      .catch(err => res.status('500').send(err))
  },

  update: function(req, res) {
    const {
      params: { id },
      body,
    } = req
    return knex('events')
      .where({ id })
      .update(body)
      .then(data => {
        handleSuccessOrErrorMessage(data, res)
      })
      .catch(err => res.status('500').send(err))
  },

  destroy: function(req, res) {
    const { id } = req.params
    return knex('events')
      .where({ id })
      .del()
      .then(data => {
        handleSuccessOrErrorMessage(data, res)
      })
      .catch(err => res.status('500').send(err))
  },
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
