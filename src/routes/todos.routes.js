const { Router } = require('express')
const todoControllers = require('../controllers/todo.controllers')

const router = Router()

router.get('/', todoControllers.getTodos)
router.post('/', todoControllers.addTodo)
router.get('/:id', todoControllers.getTodoById)
router.put('/:id', todoControllers.updateTodo)
router.delete('/:id', todoControllers.deleteTodo)

module.exports = router