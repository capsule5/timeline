const express = require('express')
const router = express.Router()
const eventController = require('../../controllers/eventController')
// const notFoundController = require("../controllers/notFoundController")

router.get('/', (req,res) => {
  res.send('hello API')
})

// Events
router.get('/events', eventController.all)
router.post('/events', eventController.create)
router.get('/events/:id', eventController.get)
router.put('/events/:id', eventController.update)
router.delete('/events/:id', eventController.destroy)

// 404
// router.get("*", notFoundController.show)

module.exports = router
