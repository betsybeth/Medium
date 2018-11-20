const jwt = require('jwt-simple')
const config = require("../config/config")
const db = require('../models/index')

module.exports = app => {

  app.post('/user/token', (req, res) => {
      if(req.body.email && req.body.password){
          const email = req.body.email
          const password = req.body.password
      db.users.findOne({where: {email: email}})
      .then(user => {
          if(db.users.isPassword(user.password, password)){
              const payload = {id: user.id}
              res.json({token: jwt.encode(payload, config.development.jwtSecret)}) 
          }
          else {
              res.sendStatus(401)
          }
      })
     .catch(error => {
         console.log("yoyoyoy", error)
         res.sendStatus(401, error)
     })
    }
    else {
        res.sendStatus(401)
    } 
  })
}