const express = require('express')
require('../db/mongoose')
const employeeRouter = require('./routers/employee')

const app = express()

app.use(express.json())
app.use(employeeRouter)

module.exports = app