const {User} = require('../models')
const decrypt = require('../helper/decrypt')

module.exports = function(req, res, next) {
    let Access_Token = req.header('Access_Token')
    let Authenticated = decrypt(Access_Token)
    console.log('masuk authentication')
    console.log(Authenticated)
    User.findOne({
        where: {
            id: Authenticated.id
        }
    })
        .then(function(result) {
            if(result !== null) {
                console.log('masuk result not null')
                req.Authenticated = result.id
                return next()
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