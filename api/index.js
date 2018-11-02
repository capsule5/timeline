const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routerApi = require('./routes/api')
const cors = require('cors')

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
