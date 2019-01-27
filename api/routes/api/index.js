import express from 'express'
import passport from 'passport'
import EventController from '../../controllers/EventController'
import TimelineController from '../../controllers/TimelineController'
import UserController from '../../controllers/UserController'
// const notFoundController = require("../controllers/notFoundController")

const router = express.Router()

// User
router.post('/logout', UserController.logout)
router.post('/register', UserController.create) // register
router.post('/login', UserController.login)
router.get('/users/:id', passport.authenticate('jwt', { session: false }), UserController.get)
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update)
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.destroy)

// Events
router.get('/events', EventController.all)
router.post('/events', EventController.create)
router.get('/events/timelines', EventController.someByTimelinesIds)
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
