const router = require('express').Router()
const projectRoutes = require('./project')
const userRoutes = require('./user')

router.get('/', function(req, res, next) {
    res.status(200).json({
        message: "Home Domain Connected"
    })
})

router.use('/projects', projectRoutes)
router.use('/user', userRoutes)


module.exports = router