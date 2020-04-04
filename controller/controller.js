const {ProjectUser, User, Project, Todo} = require('../models')

class Controller {
    static getProject(req, res, next) { //Done & Tested
        ProjectUser.findAll({
            where: {
                UserId: req.Authenticated
            },
            include: ['User', 'Project']
        })
            .then(function(result) {
                return res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static addProject(req, res, next) { //Done And Tested
        let project;
        Project.create({
            UserId: req.Authenticated, // dari authentication
            Title: req.body.Title
        })
            .then(function(result) {
                project = result
                return ProjectUser.create({
                    UserId: req.Authenticated,
                    ProjectId: project.id,
                })
            })
            .then(function(result) {
                let payload = {
                    msg: 'Add Project Success',
                    result
                }
                return res.status(201).json(payload)

            })
            .catch(function(err) {
                next(err)
            })
    }

    static deleteProject(req, res, next) { //Done And Tested
        let data;
        Project.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(result) {
                data = result
                if(data) {
                    return ProjectUser.destroy({
                        where: {
                            ProjectId: data.id
                        }
                    })    
                }
                else {
                    let err = {
                        msg: 'Data Not Found'
                    }
                    throw err
                }
            })        
            .then(function(result) {
                return Project.destroy({
                    where: {
                        id: data.id
                    }
                })
            })
            .then(function(result) {
                let payload = {
                    msg: "Successfully Deleted The Said Project"
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static addFriend(req, res, next) {  //Done And Tested
        let user;
        User.findOne({
            where: {
                Email: req.body.Email
            }
        })
            .then(function(result) {
                if(result) {
                    user = result.dataValues
                   return ProjectUser.findOne({
                       where: {
                           ProjectId: req.body.ProjectId,
                           UserId: user.id
                       }
                   })
                }
                else {
                    let err = {
                        msg: 'User Does not Exist'
                    }
                    throw err
                }
            })
            .then(function(result) {
                if(result !== null) {
                    let err = {
                        msg: 'User Already Exist!!'
                    }
                    throw err
                }
                else {
                    return ProjectUser.create({
                        UserId: user.id,
                        ProjectId: req.body.ProjectId
                    })
                }
            })
            .then(function(result) {
                let payload = {
                    msg: 'Successfully Added!!'
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static deleteFriend(req,res, next) { //Done And Tested
        let user
        User.findOne({
            where: {
                Email: req.body.Email
            }
        })
            .then(function(result) {
                if(result == null) {
                    let err = {
                        msg: 'User Does not Exist'
                    }
                    throw err
                }
                else {
                    user = result.dataValues
                    return ProjectUser.destroy({
                        where: {
                            UserId: user.id,
                            ProjectId: req.body.ProjectId
                        }
                    })
                    
                }
            })
            .then(function(result) {
                let payload = {
                    msg: 'Successfully Removed the said Email'
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static getTodo(req, res, next) { //Done And Tested
        let Todos;
        let Members;
        let ProjectId = req.body.ProjectId
        let Dates = []
        Project.findOne({
            where: {
                id: ProjectId
            },
        })
            .then(function(result) {
                if(result == null) {
                    let err = {
                        msg: 'Project Does Not Exist'
                    }
                    throw err
                }
                else {
                    return Todo.findAll({
                        where: {
                            ProjectId: ProjectId
                        }
                    })
                }
            })
            .then(function(result) {
                Todos = result
                // console.log(Todos.length)
                for(let i = 0; i < Todos.length; i++) {
                    let date = Todos[i].DueDate.toString().slice(4,15)
                    console.log(date)
                    Dates.push(date)
                    date = ''
                }
                console.log(Todos[0])
                return ProjectUser.findAll({
                    where: {
                        ProjectId: ProjectId
                    },
                    include: ['User']
                })
                // return res.status(200).json(result)

            })
            .then(function(result) {
                Members = result
                return res.status(200).json({
                    Todos,Members,Dates
                })
            })
            .catch(function(err) {
                next(err)
            })

    }

    static addTodo(req, res, next) { //Done And Tested
        const { Title, Content, DueDate, Status, ProjectId} = req.body

        Project.findOne({
            where: {
                id: ProjectId
            }
        })
            .then(function(result) {
                if(result !== null) {
                    return Todo.create({
                        Title,
                        Content,
                        DueDate,
                        Status,
                        ProjectId
                    })
                }
                else {
                    let err = {
                        msg: 'Project Does Not Exist'
                    }
                    throw err
                }
            })
            .then(function(result) {
                let payload = {
                    msg: 'Successfully Created',
                    data: result
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })

    }

    static updateTodo(req, res, next) { //Done And Tested
        const { Title, Content, DueDate, Status, ProjectId} = req.body
        let date = new Date(DueDate)
        let today = new Date()
        if(date < today) {
            let err = {
                msg: 'Cannot Less Than Today'
            }
            throw err
        }
        else {
            Todo.update({
                Title,
                Content,
                DueDate,
                Status,
                ProjectId
            }, {
                where: {
                    id: req.params.id
                }
            })
                .then(function(result) {
                    let payload = {
                        msg: "Successfully Updated",
                        data: result
                    }
                    return res.status(201).json(payload)
                })
                .catch(function(err) {
                    next(err)
                })
        }   
    }

    static deleteTodo(req, res, next) { //Done And Tested
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(result) {
                if(result !== null) {
                    return Todo.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                }
                else {
                    let err = {
                        msg: 'Todo Does Not Exist'
                    }
                    throw err
                }
            })
        
            .then(function(result) {
                let payload = {
                    msg: 'Successfully Deleted'
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })

    }

}

module.exports = Controller