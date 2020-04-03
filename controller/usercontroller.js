const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Axios = require('axios')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENTID)
const encrypt = require('../helper/encrypt')

class UserController {
    static Register(req, res, next) { //Done And Tested
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
                return res.status(201).json(msg)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static Login(req, res, next) { //Done And Tested
        let geolocation = {}
        Axios({
            url: 'https://freegeoip.app/json/',
            method: 'GET'
        })
            .then(function(result) {
                geolocation = result.data
                return User.findOne({
                    where: {
                        Email: req.body.Email
                    }
                })
            })
            .then(function(result) {
                if(bcrypt.compareSync(req.body.Password, result.Password)) {
                    let data = {
                        id: result.id,
                        Email: result.Email
                    }
                    let Access_Token = jwt.sign(data, process.env.SECRET, { expiresIn: 60*60 })
                    let payload = {
                        Access_Token,
                        Email: result.Email,
                        geolocation: geolocation
                    }
                    return res.status(200).json(payload)
                }
                else {
                    let err = {
                        msg: 'Email / Password Error'
                    }
                    throw err
                }
            })
            .catch(function(err) {
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        let payload;
        let login;
        let token = req.headers.access_token
        let geolocation
        let data
        let Access_Token
        const ticket = client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENTID
        })
            .then(function(ticket) {
                payload = ticket.getPayload()
                const userid = payload['sub']
                return Axios({
                    url: 'https://freegeoip.app/json/',
                    method: 'GET'
                })
            })
            .then(function(result) {
                geolocation = result.data
                return User.findOne({
                    where: {
                        Email: payload.email
                    }
                })
            })
            .then(function(result) {
                if(result) {
                    data = {
                        id: result.id,
                        Email: result.Email
                    }
                    Access_Token = jwt.sign(data, process.env.SECRET, { expiresIn: 60*60 })
                    payload = {
                        Access_Token,
                        Email: result.Email,
                        geolocation: geolocation
                    }
                    return res.status(200).json(payload)
                }
                else {
                    return User.create({
                        Email: payload.email,
                        Password: encrypt('default')
                    })
                }
                
            })
            .then(function(result) {
                data = {
                    id: result.id,
                    Email: result.Email
                }
                Access_Token = jwt.sign(data, process.env.SECRET, { expiresIn: 60*60 })
                    payload = {
                        Access_Token,
                        Email: result.Email,
                        geolocation: geolocation
                    }
                    return res.status(200).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }

}

module.exports = UserController