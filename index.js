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
  res.status(500).send({ message: err })
})
app.use((req, res, next) => {
  res.status(404).send({ message: "Route does not exist" })
})

app.listen(app.get("port"), () => {
  console.log(`Medium API - Port ${app.get("port")}`) // eslint-disable-line no-console
})

module.exports = app
