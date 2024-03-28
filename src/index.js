const exporess = require('express')
const { createServer } = require('http')
const bodyParser = require('body-parser')
const routes = require('./routes/index')

const app = exporess()

app.use(bodyParser.json())

routes(app)

const httpServer = createServer(app)

const PORT = 3000

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})