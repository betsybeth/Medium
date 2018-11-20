const db = require('../models/index')
const pushid = require('pushid')

module.exports = (app) => {
    app.route('/blogs')
    .all(app.auth.authenticate())
    .post((req, res) => {
      const blog = {
          id : pushid(),
          title : req.body.title,
          description :  req.body.description
        }
        db.blogs.create(blog)
        .then(blog => {
            delete blog.dataValues.id
            delete blog.dataValues.userId
            res.json(blog)
        })
        .catch((error) => {
            res.status(412).json({
                msg: error.message
            })
        })
    })
    .get((req, res) => {
        db.blogs.findAll({
            attributes: ['title', 'description']
        })
        .then(result => res.status(412).json({msg: result}))
        .catch(error => {
            res.status(412).json({
                msg: error.message
            })
        })
    })

    app.route('/blogs/:id')
    .all(app.auth.authenticate())
    //  Getting one blog using the id
    .get((req, res) => {
        db.blogs.findOne({
            where: req.params
        }).then( result => {
            if(result){
                res.json(result);
            }else{
                res.sendStatus(404)
            }
        }).catch(error => {
            res.status(412)
            sessionStorage({msg: error.message})

       })
    })
    .all(app.auth.authenticate())
    .put((req, res) => {
        const blogUpdated = {
            title : req.body.title,
            description :  req.body.description
          } 
      db.blogs.update(blogUpdated, {where:req.params})
      .then(result => {
          res.json(blog)
      })
      .catch(error => {
          res.status(412).json({
              msg: error.message
          })
      })

    })
    .delete((req, res) => {
        db.blogs.destroy({where: req.parama})
        .then(result => res.sendStaus(204))
        .catch(error => {
            res.status(412).json({msg: error.message})
        })
    })
    
}