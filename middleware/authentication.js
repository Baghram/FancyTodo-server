const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = function(req, res, next) {
    let Access_Token = req.header('Access_Token')
    let Authenticated = jwt.verify(Access_Token, process.env.SECRET)
    req.Authenticated = Authenticated
    User.findOne({
        where: {
            Email: req.Authenticated.id
        }
    })
        .then(function(result) {
            if(result !== null) {
                next()
            }
            else {
                let err = {
                    msg: 'Unauthorized'
                }
                throw err
            }
        })
        .catch(function(err) {
            next(err)
        })
}