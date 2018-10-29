const db = require('../models/index')
const pushid = require('pushid')

module.exports = (app) =>  {
    app.route('/comments')
    .all((req, res, next) => {
     delete req.body.id
     next();
    })
    .post((req, res) => {
        const comment = {
            id: pushid(),
            comment:req.body.comment,
            writtenBy: req.body.writtenBy
        }
        db.comments.create(comment)
        .then((comment)=> {
           res.json(comment)
        })
        .catch((error) => {
            error.message
        })
    })
}