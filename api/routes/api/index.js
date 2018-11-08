const express = require('express')
const router = express.Router()
const eventController = require('../../controllers/eventController')
const storyController = require('../../controllers/storyController')
// const notFoundController = require("../controllers/notFoundController")

router.get('/', (req, res) => {
  res.send('hello API')
})

// Events
router.get('/events', eventController.all)
router.post('/events', eventController.create)
router.get('/events/:id', eventController.get)
router.put('/events/:id', eventController.update)
router.delete('/events/:id', eventController.destroy)

// Stories
router.get('/stories', storyController.all)
router.post('/stories', storyController.create)
router.get('/stories/:id', storyController.get)
router.put('/stories/:id', storyController.update)
router.delete('/stories/:id', storyController.destroy)

// 404
// router.get("*", notFoundController.show)

module.exports = router
