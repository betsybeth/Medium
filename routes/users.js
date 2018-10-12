const db = require('../models/index')
const pushid = require('pushid')
var { check, validationResult } = require('express-validator/check')

module.exports = (app) => {
    app.post('/register', 
         [  
          check('email').isEmail(),
          check('password').isLength({ min: 5})
         ], 
       (req, res) => {
           const errors = validationResult(req)
           if(!errors.isEmpty()){
               return res.status(422).json({errors: errors.array() })
           }
        id = pushid()
        const users = {
            id: id,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
       db.user.create(users)
        .then(user => { 
            res.json(user)
        })
        .catch((err) => {
           res.status(412).json({ msg: err.message})
        })
    })

    app.get('/users/:id', (req, res) => {
        db.user.findById(req.params.id, {
            atrributes:['id', 'username', 'email']
        })
        .then(result => res.json(result))
        .catch((error) => {
            res.status(412).json({ msg: error.message})
        })
    })

    app.delete('/users/:id', (req, res) => {
      db.user.destroy({where: {id: req.params.id}})
      .then(() => {
          res.sendStatus(204).json({msg: 'user has been permanently deleted from the database'})
        })
      .catch((error) => {
          res.status(412).json({ msg: error.message})
      })
})

}
