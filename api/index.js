import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routerApi from './routes/api'
import cors from 'cors'
import faker from 'faker'

// console.warn('[stab]', {
//   sentence: faker.lorem.sentence(),
//   color: faker.internet.color(),
//   number: faker.random.number({
//     min: -3000,
//     max: 2018,
//   }),
// })

const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', routerApi)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Timeline server running on port ${PORT}.`)
})
