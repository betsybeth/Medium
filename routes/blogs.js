const db = require('../models/index')
const pushid = require('pushid')

module.exports = (app) => {
    app.route('/blogs')
    .all((req, res, next) => {       
        delete req.body.id
        next();
    })
    .post((req, res) => {
      const blog = {
          id : pushid(),
          title : req.body.title,
          description :  req.body.description
        }
        db.blogs.create(blog)
        .then(blog => {
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
    .all(( req, res, next) => {
        delete req.body.id;
        next();
    })
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
            res.status(412).j
        sessionStorage({msg: error.message})

       })
    })
    .put((req, res) => {
        const blogUpdated = {
            title : req.body.title,
            description :  req.body.description
          } 
      db.blogs.update(blogUpdated, {where:req.params})
      .then(result => res.sendStatus(204))
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