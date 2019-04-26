const pushid = require("pushid")
const db = require("../../models/index")

class CommentsRepository {
  static async createComment(req) {
    try {
      const commentData = {
        id: pushid(),
        comment: req.body.comment,
        writtenBy: req.user.id,
        blogId: req.params.blogid,
      }
      const { blogid } = req.params
      const blogExist = await db.blogs.findByPk(blogid)
      if (!blogExist) {
        return { msg: "Blog not found" }
      }
      await db.comments.create(commentData)
      return { message: "Comment has been posted successfully" }
    } catch (error) {
      throw error
    }
  }

  static async updateComment(req) {
    try {
      const { blogId } = req.params
      const { commentId } = req.params
      const commentData = {
        comment: req.body.comment,
      }
      const checkIfBlogExists = await db.blogs.findByPk(blogId)
      if (!checkIfBlogExists) {
        return { msg: "blog not found" }
      }
      const checkifCommentExists = await db.comments.findByPk(commentId)
      if (checkifCommentExists) {
        await db.comments.update(commentData, {
          where: { id: commentId },
        })
        return { message: "comment updated" }
      }
      return { msg: "comment not found" }
    } catch (error) {
      throw error
    }
  }

  static async deleteComment(req) {
    try {
      const { commentId } = req.params
      const checkifCommentExists = await db.comments.findByPk(commentId)
      if (checkifCommentExists) {
        await db.comments.destroy({
          where: {
            id: commentId,
          },
        })
        return { message: "comment deleted" }
      }
      return { msg: "comment not found " }
    } catch (error) {
      throw error
    }
  }
}

module.exports = CommentsRepository
