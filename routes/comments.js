const db = require('../models/index')
const pushid = require('pushid')

module.exports = (app) =>  {
    app.route('blog/:id/comments')
    .all(app.auth.authenticate())
    .post((req, res) => {
        console.log("heey", payload)
        const comment = {
            id: pushid(),
            comment:req.body.comment,
            writtenBy: req.body.writtenBy,
            blog: blogId
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