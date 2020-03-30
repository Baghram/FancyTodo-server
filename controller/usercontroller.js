const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
    static Register(req, res, next) {
        User.findOne({
            where: {
                Email: req.body.Email
            }
        })
            .then(function(result) {
                if(result) {
                    let err = {
                        msg: 'Email Already Exist'
                    }
                    throw err
                }
                else {
                    return User.create({
                        Email: req.body.Email,
                        Password: req.body.Password
                    })
                }
            })
            .then(function(result) {
                let msg = {
                    message: 'Register Success!!',
                    Email: result.Email
                }
                res.status(201).json(msg)
            })
            .catch(function(err) {
                console.log(err.message)
                next(err)
            })
    }

    static Login(req, res, next) {
        User.findOne({
            where: {
                Email: req.body.Email
            }
        })
            .then(function(result) {
                console.log(bcrypt.compareSync(req.body.Password, result.Password))
                if(bcrypt.compareSync(req.body.Password, result.Password)) {
                    let data = {
                        id: result.id,
                        Email: result.Email
                    }
                    let Access_Token = jwt.sign(data, process.env.SECRET, { expiresIn: 60*60 })
                    let payload = {
                        Access_Token,
                        Email: result.Email
                    }
                    res.status(200).json(payload)

                }
                else {
                    let err = {
                        msg: 'Email / Password Error'
                    }
                    throw err
                }
                

                
            })
            .catch(function(err) {
                console.log(err)
                next(err)
            })
    }

}

module.exports = UserController