const express = require('express')
var consign = require('consign')


const app = express()
consign()
.include('config')
.then('models/index.js')
.then('auth.js')
.then('lib/middlewares.js')
.then('routes')
.then('lib/boot.js')
.into(app);












