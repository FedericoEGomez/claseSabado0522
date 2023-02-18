const express = require('express')
const cors = require("cors")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
require("dotenv").config()


const app = express()

const indexRouter = require("./routers/index")
const userRouter = require("./routers/user")
const apiRouter = require("./routers/api")
const {connect} = require("./db/db")


app.use(logger("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


//http://localhost:3000/user
app.use('/', indexRouter)
app.use('/user',userRouter)
app.use('/api',apiRouter)

connect()



module.exports = app

