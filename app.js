if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
let errhandler = require('./middleware/errhandler')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(router)

app.use(errhandler)
app.listen(process.env.PORT, function () {
    console.log(`listening to port ${process.env.PORT}`)
})
