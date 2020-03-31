module.exports = function(err, req, res, next) {
    let message = []
    let msg = {}
    if(err.name) {
        switch (err.name) {
            case 'SequelizeValidationError':
                for(let i = 0; i < err.errors.length; i++) {
                    message.push(err.errors[i].message)
                }
                return res.status(400).json(message)
                break;
            case 'SequelizeUniqueConstraintError': 
                msg = {
                    type: 'Bad Request',
                    message: "Email Already Used!!"
                }
                return res.status(400).json(message)
                break;
            case 'TokenExpiredError':
                msg = {
                    type: 'Forbidden',
                    message: 'Token Expired, Pelase Relog'
                }
                return res.status(403).json(msg)
                break;
            case 'JsonWebTokenError':
                msg = {
                    type: 'Forbidden',
                    message: 'jwt malformed'
                }
                return res.status(403).json(msg)
                break;
            case 'Error': 
                msg = {
                    type: 'Bad request',
                    message: err.message
                }
                return res.status(400).json(msg)
            default:
                msg = {
                    message: "Bad Request",
                    err
                }
                return res.status(400).json(err)
                break;
        }
    }
    else {
        switch (err.msg) {
            case 'Email / Password Error':
                msg = {
                    type: 'Bad Request',
                    message: 'Email / Password Error'
                }
                return res.status(400).json(msg)
                break;
            case 'Not Authorized': 
                msg = {
                    type: 'Unauthorized',
                    message: "Not Authorized"
                }
                return res.status(401).json(msg)
                break;
            case 'Authentication Failed':
                msg = {
                    type: 'Unauthorized',
                    message: 'Authentication Failed'
                }
                return res.status(401).json(msg)
                break;
            case 'Please Fill Email': 
                msg = {
                    type: 'Bad Request',
                    message: "Please Fill Email"
                }
                return res.status(400).json(msg)
                break;
            case 'Please Fill in Email Format':
                msg = {
                    type: 'Bad Request',
                    message: 'Please Fill in Email Format'
                }
                return res.status(400).json(msg)
                break;
            case 'Please Fill Password':
                msg = {
                    type: 'Bad Request',
                    message: 'Please Fill Password'
                }
                return res.status(400).json(msg)
                break;
            case 'Email Already Exist': 
                msg = {
                    type: 'Bad Request',
                    message: 'Email Already Exist'
                }
                return res.status(400).json(msg)
                break;
            case 'Must Have At Least 3 Characters': 
                msg = {
                    message: 'Must Have At Least 3 Characters'
                }
                return res.status(400).msg
            default:
                msg = {
                    type: "Internal Server Error",
                    message: err
                }
                return res.status(500).json(msg)
                break;
        }
    }
}