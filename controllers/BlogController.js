const BlogsRepository = require("../lib/repository/blogs")

class BlogController {
  static async create(req, res, next) {
    const createBlogRepository = await BlogsRepository.createBlog(req)
    res.json(createBlogRepository)
    next()
  }

  static async update(req, res, next) {
    try {
      const blogRepository = await BlogsRepository.updateBlog(req)
      if (blogRepository.msg) {
        return res.status(404).json(blogRepository.msg)
      }
      return res.status(200).json(blogRepository.message)
    } catch (error) {
      return next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const blogDelete = await BlogsRepository.deleteBlog(req)
      if (blogDelete.msg) {
        res.status(404)
      }
      return res.status(202).send(blogDelete)
    } catch (error) {
      return next(error)
    }
  }
}
module.exports = BlogController
