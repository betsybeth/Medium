const db = require('../models/index')
const pushid = require('pushid')
const { check, validationResult } = require('express-validator/check')


module.exports = (app) => {
    app.route('/user/register')
    .post((req, res) => {
        [  
            check('email').isEmail(),
            check('password').isLength({ min: 5})
        ]
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() })
        }

        const user = {
            id: pushid(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
       db.users.create(user)
        .then(user => { 
            console.log("dksn", user)
            res.json(user)
        })
        .catch((err) => {
           res.status(412).json({ msg: err.message})
        })
    })

    app.get('/users/:id', (req, res) => {
        db.users.findById(req.params.id, {
            atrributes:['id', 'username', 'email']
        })
        .then(result => res.json(result))
        .catch((error) => {
            res.status(412).json({ msg: error.message})
        })
    })

    app.delete('/users/:id', (req, res) => {
      db.users.destroy({where: {id: req.params.id}})
      .then(() => {
          res.sendStatus(204).json({msg: 'user has been permanently deleted from the database'})
        })
      .catch((error) => {
          res.status(412).json({ msg: error.message})
      })
})

}
