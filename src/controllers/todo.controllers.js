const fs = require('fs')
const path = require('path')

const getTodoFile = async () => {
  try {
    const data = await fs.readFileSync(path.join(__dirname, '../data/todo.json'))
    const todos = JSON.parse(data)
    return todos
  }
  catch (err) {
    console.log(err)
  }
}

const writeTodoFile = async (newTodos) => {
  try {
    const dataString = JSON.stringify(newTodos)
    const data = await fs.writeFileSync(path.join(__dirname, '../data/todo.json'), dataString)
    
    return data
  }
  catch (err) {
    console.log(err)
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await getTodoFile()

    return res.status(200).json({ todos: todos })
  }
  catch (err) {
    console.log(err)

    return res.status(400).json({ err: 'Something went wrong !' })
  }
}

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params
    const todos = await getTodoFile()
    const todo = todos.find(todo => todo.id === Number(id))

    return res.status(200).json({ todo: todo })
  }
  catch (err) {
    console.log(err)

    return res.status(400).json({ err: 'Something went wrong !' })
  }
}

const addTodo = async (req, res) => {
  const { title } = req.body
  const todos = await getTodoFile()
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
    title,
    isDone: false,
  }
  const mergedTodos = [
    ...todos,
    newTodo,
  ]
  
  await writeTodoFile(mergedTodos)
  
  return res.status(200).json({ message: 'Successfully Added !'})
}

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const { title, isDone } = req.body
    const todos = await getTodoFile()
    const newTodos = todos.map(todo => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          title: title ? title : todo.title,
          isDone: isDone !== undefined ? isDone : todo.isDone,
        }
      }

      return todo
    })
    await writeTodoFile(newTodos)
  
    return res.status(200).json({ message: 'Successfully Updated !'})
  }
  catch (err) {
    console.log(err)

    return res.status(400).json({ err: 'Something went wrong !' })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todos = await getTodoFile()
    const newTodos = todos.filter(todo => todo.id !== Number(id))
    await writeTodoFile(newTodos)
  
    return res.status(200).json({ message: 'Successfully Deleted !'})
  }
  catch (err) {
    console.log(err)

    return res.status(400).json({ err: 'Something went wrong !' })
  }
}
module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo
}