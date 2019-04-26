const BlogsRepository = require("../lib/repository/blogs")

class BlogController {
  static async create(req, res, next) {
    const createBlogRepository = await BlogsRepository.createBlog(req)
    try {
      if (createBlogRepository.msg) {
        return res.status(409).json(createBlogRepository.msg)
      }
      return res.status(200).json(createBlogRepository.message)
    } catch (error) {
      return next(error)
    }
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

  static async react(req, res, next) {
    try {
      const reactBlogRepository = await BlogsRepository.reactToBlog(req)
      if (reactBlogRepository.msg) {
        return res.status(404).json(reactBlogRepository.msg)
      }
      return res.status(200).json(reactBlogRepository.message)
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

  static async get(req, res, next) {
    try {
      const getBlog = await BlogsRepository.getBlogs(req)
      if (getBlog.msg) {
        return res.status(404).json(getBlog.msg)
      }
      return res.status(200).json(getBlog.message)
    } catch (error) {
      console.log("=======", error.toString())
      return next()
    }
  }
}
module.exports = BlogController
