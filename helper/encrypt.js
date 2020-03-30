const bcrypt = require('bcryptjs')

function encrypt(value) {
    let salt = bcrypt.genSaltSync(5)
    let hash = bcrypt.hashSync(value, salt)
    return hash
}

module.exports = encrypt