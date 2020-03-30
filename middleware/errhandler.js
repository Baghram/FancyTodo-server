module.exports = function(err, req, res, next) {
    let message = []
    let msg = {}
    if(err.name) {
        switch (err.name) {
            case 'SequelizeValidationError':
                for(let i = 0; i < err.errors.length; i++) {
                    message.push(err.errors[i].message)
                }
                res.status(400).json(message)
                break;
            case 'SequelizeUniqueConstraintError': 
                msg = {
                    type: 'Bad Request',
                    message: "Email Already Used!!"
                }
                res.status(400).json(message)
                break;
            case 'TokenExpiredError':
                msg = {
                    type: 'Forbidden',
                    message: 'Token Expired, Pelase Relog'
                }
                res.status(403).json(msg)
                break;
            case 'JsonWebTokenError':
                msg = {
                    type: 'Forbidden',
                    message: 'jwt malformed'
                }
                res.status(403).json(msg)
                break;
            case 'Error': 
                msg = {
                    type: 'Bad request',
                    message: err.message
                }
                res.status(400).json(msg)
            default:
                msg = {
                    message: "Bad Request",
                    err
                }
                res.status(400).json(err)
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
                res.status(400).json(msg)
                break;
            case 'Not Authorized': 
                msg = {
                    type: 'Unauthorized',
                    message: "Not Authorized"
                }
                res.status(401).json(msg)
                break;
            case 'Authentication Failed':
                msg = {
                    type: 'Unauthorized',
                    message: 'Authentication Failed'
                }
                res.status(401).json(msg)
                break;
            case 'Please Fill Email': 
                msg = {
                    type: 'Bad Request',
                    message: "Please Fill Email"
                }
                res.status(400).json(msg)
                break;
            case 'Please Fill in Email Format':
                msg = {
                    type: 'Bad Request',
                    message: 'Please Fill in Email Format'
                }
                res.status(400).json(msg)
                break;
            case 'Please Fill Password':
                msg = {
                    type: 'Bad Request',
                    message: 'Please Fill Password'
                }
                res.status(400).json(msg)
                break;
            case 'Email Already Exist': 
                msg = {
                    type: 'Bad Request',
                    message: 'Email Already Exist'
                }
                res.status(400).json(msg)
                break;
            case 'Must Have At Least 3 Characters': 
                msg = {
                    message: 'Must Have At Least 3 Characters'
                }
                res.status(400).msg
            default:
                msg = {
                    type: "Internal Server Error",
                    message: err
                }
                res.status(500).json(msg)
                break;
        }
    }
}