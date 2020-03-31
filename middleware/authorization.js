const {ProjectUser} = require('../models')

module.exports = function(req, res, next) {
    ProjectUser.findOne({
        where: {
            UserId: req.Authenticated,
            ProjectId: req.body.ProjectId
        }
    })
        .then(function(result) {
            console.log(result, 'THIS IS AUTH')
            if(result !== null) {
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