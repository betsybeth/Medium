const express = require('express')
var consign = require('consign')


const app = express()
consign()
.include('config')
.then('models/index.js')
.then('lib/middlewares.js')
.then('routes/users.js')
.then('routes/blogs.js')
.then('lib/boot.js')
.into(app);












