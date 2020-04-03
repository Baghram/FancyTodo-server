const projectRoutes = require('express').Router()
const Controller = require('../controller/controller')
const Authentication = require('../middleware/authentication')
const Authorization = require('../middleware/authorization')

projectRoutes.use(Authentication)
projectRoutes.get('/', Controller.getProject) //DONE
projectRoutes.post('/add', Controller.addProject) //DONE
projectRoutes.delete('/delete/:id', Controller.deleteProject) //DONE
projectRoutes.post('/friend', Controller.addFriend) //DONE
projectRoutes.delete('/friend', Controller.deleteFriend) //DONE
projectRoutes.post('/todos', Controller.getTodo) //DONE
projectRoutes.post('/todos/add', Controller.addTodo) //DONE
projectRoutes.use(Authorization)
projectRoutes.patch('/todos/:id', Controller.updateTodo) //DONE
projectRoutes.delete('/todos/:id', Controller.deleteTodo) //DONE


module.exports = projectRoutes