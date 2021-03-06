import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routerApi from './routes/api'
import cors from 'cors'
import passport from 'passport'
import './middlewares/passport'

const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use('/', routerApi)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Timeline server running on port ${PORT}.`)
})
