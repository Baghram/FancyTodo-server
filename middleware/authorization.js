const {ProjectUser} = require('../models')

module.exports = function(req, res, next) {
    ProjectUser.findOne({
        where: {
            UserId: req.Authenticated.id
        }
    })
        .then(function(result) {
            if(result) {
                next()
            }
            else {
                let err = {
                    msg: "Unauthorized"
                }
                throw err
            }
        })
        .catch(function(err) {
            next(err)
        })
}