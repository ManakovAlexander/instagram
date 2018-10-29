const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cors = require('./libs/cors')
const errorHandlers = require('./libs/error-handlers')

const app = express()

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cors())
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

const mongoose = require('mongoose');
const dbName = 'passport_db';
async function getConnection({ url = 'localhost', port = '27017', dbName }) {
  return await mongoose.connect(`mongodb://${url}:${port}/${dbName}`)
}
getConnection({ dbName })

app.use('/files', express.static('files'));
app.use('/auth', require('./modules/auth'))
app.use('/users', require('./modules/users'))
app.use('/posts', require('./modules/posts'))

app.use((req, res, next) => {
  res.status(404)
  res.send({ error: 'Not found' })
})

app.use(errorHandlers.mainHandler)

const serverPort = process.env.PORT || 1337
app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`))
