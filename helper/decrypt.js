const jwt = require('jsonwebtoken')

function decrypt(value) {
    let result  = jwt.verify(value, process.env.SECRET)
    return result
}

module.exports = decrypt