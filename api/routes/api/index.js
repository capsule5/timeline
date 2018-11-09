import express from 'express'
import EventController from '../../controllers/EventController'
import TimelineController from '../../controllers/TimelineController'
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

// Timelines
router.get('/timelines', TimelineController.all)
router.post('/timelines', TimelineController.create)
router.get('/timelines/:id', TimelineController.get)
router.put('/timelines/:id', TimelineController.update)
router.delete('/timelines/:id', TimelineController.destroy)

// 404
// router.get("*", notFoundController.show)

export default router
