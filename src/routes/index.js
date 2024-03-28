
const todoRoutes = require('./todos.routes')

module.exports = app => {
  app.use('/todos', todoRoutes)
}