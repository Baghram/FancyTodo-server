const projectRoutes = require('express').Router()
const Controller = require('../controller/controller')

projectRoutes.get('/', Controller.getProject)
projectRoutes.post('/add', Controller.addProject)
projectRoutes.delete('/delete/:id', Controller.deleteProject)
projectRoutes.post('/friend', Controller.addFriend)
projectRoutes.delete('/friend/:id', Controller.deleteFriend)
projectRoutes.get('/todos', Controller.getTodo)
projectRoutes.post('/todos', Controller.addTodo)
projectRoutes.patch('/todos/:id', Controller.updateTodo)
projectRoutes.delete('/todos/:id', Controller.deleteTodo)


module.exports = projectRoutes