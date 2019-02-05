const bodyParser = require("body-parser")
const express = require("express")
const expressValidator = require("express-validator")
const users = require("./routes/user")

const app = express()
require("./models/index")
require("./lib/repository/auth/auth")

app.use(bodyParser.json())
app.set("port", 3000)
app.set("json spaces", 4)
app.use(expressValidator())
app.use("/", users)

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.status(500).json(err.message)
  next()
})

app.listen(app.get("port"), () => {
  console.log(`Medium API - Port ${app.get("port")}`) // eslint-disable-line no-console
})
module.exports = app
