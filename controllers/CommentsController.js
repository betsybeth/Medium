const CommentsRepository = require("../lib/repository/comments")

class CommentsController {
  static async create(req, res, next) {
    try {
      const commentCreate = await CommentsRepository.createComment(req)
      if (commentCreate.msg) {
        return res.status(404).json(commentCreate.msg)
      }
      return res.status(200).json(commentCreate.message)
    } catch (error) {
      return next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const commentUpdate = await CommentsRepository.updateComment(req)
      if (commentUpdate.msg) {
        return res.status(404).json(commentUpdate.msg)
      }
      return res.status(200).json(commentUpdate.message)
    } catch (error) {
      return next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const commentDelete = await CommentsRepository.deleteComment(req)
      if (commentDelete.msg) {
        return res.status(404).json(commentDelete.msg)
      }
      return res.status(200).json(commentDelete.message)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = CommentsController
