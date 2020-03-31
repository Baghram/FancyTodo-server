const {ProjectUser, User, Project, Todo} = require('../models')

class Controller {
    static getProject(req, res, next) {
        ProjectUser.findAll({
            where: {
                ProjectId: req.body.ProjectId
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

    static addProject(req, res, next) {
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
                return res.status(201).json({
                    payload,
                    result
                })
            })
            .catch(function(err) {
                next(err)
            })
    }

    static deleteProject(req, res, next) {
        ProjectUser.destroy({
            where: {
                ProjectId: req.body.ProjectId
            }
        })
            .then(function(result) {
                return Project.destroy({
                    where: {
                        id: req.body.ProjectId
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
                return err
            })
    }

    static addFriend(req, res, next) { 
        let user;
        User.findOne({
            where: {
                Email: req.body.Email
            }
        })
            .then(function(result) {
                if(result) {
                    user = result
                    return ProjectUser.Create({
                        UserId: user.id,
                        ProjectId: req.body.ProjectId
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
                let payload = {
                    msg: 'Successfully Added!!'
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static deleteFriend(req,res, next) {
        ProjectUser.destroy({
            where: {
                UserId: req.body.UserId,
                ProjectId: req.body.ProjectId
            }
        })
            .then(function(result) {
                let payload = {
                    msg: 'Successfully Removed the said Email'
                }
                return res.status(201).json(payload)
            })
    }

    static getTodo(req, res, next) {
        Project.findOne({
            where: {
                ProjectId: req.body.ProjectId
            },
            include: ['Todo']
        })
            .then(function(result) {
                return res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })

    }

    static addTodo(req, res, next) {
        const { Title, Content, DueDate, Status, ProjectId} = req.body
        Todo.create({
            Title,
            Content,
            DueDate,
            Status,
            ProjectId
        })
            .then(function(result) {
                let payload = {
                    msg: 'Successfully Created',
                    data: result
                }
                return res.status(201).json(payload)
            })

    }

    static updateTodo(req, res, next) {
        const { Title, Content, DueDate, Status, ProjectId} = req.body
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

    static deleteTodo(req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
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