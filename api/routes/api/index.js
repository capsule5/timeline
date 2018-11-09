import express from 'express'
import EventController from '../../controllers/EventController'
import StoryController from '../../controllers/StoryController'
// const notFoundController = require("../controllers/notFoundController")

const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello API')
})

// Events
router.get('/events', EventController.all)
router.post('/events', EventController.create)
router.get('/events/:id', EventController.get)
router.put('/events/:id', EventController.update)
router.delete('/events/:id', EventController.destroy)

// Stories
router.get('/stories', StoryController.all)
router.post('/stories', StoryController.create)
router.get('/stories/:id', StoryController.get)
router.put('/stories/:id', StoryController.update)
router.delete('/stories/:id', StoryController.destroy)

// 404
// router.get("*", notFoundController.show)

export default router
