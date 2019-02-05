const pushid = require("pushid")
const db = require("../../models/index")

class BlogsRespository {
  static async createBlog(req) {
    try {
      const blogsData = {
        id: pushid(),
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id,
      }
      const blogExist = await db.blogs.findOne({
        where: { title: req.body.title },
      })
      if (blogExist) {
        return { msg: "blog already exists" }
      }
      const blogs = await db.blogs.create(blogsData)
      delete blogs.dataValues.id
      delete blogs.dataValues.userId
      return blogs
    } catch (error) {
      throw error
    }
  }

  static async updateBlog(req) {
    try {
      const { blogid } = req.params
      const blogUpdateData = {
        title: req.body.title,
        description: req.body.description,
      }
      const findBlogById = await db.blogs.findByPk(blogid)
      if (!findBlogById) {
        return { msg: "Blog not found" }
      }
      await db.blogs.update(blogUpdateData, {
        where: { id: blogid },
      })
      return { message: "blog has been successfully updated" }
    } catch (error) {
      throw error
    }
  }

  static async deleteBlog(req) {
    try {
      const blog = await db.blogs.findByPk(req.params.blogid)
      if (!blog) {
        return { msg: "Blog does not exist" }
      }
      await db.blogs.destroy({
        where: {
          id: req.params.blogid,
        },
      })
      return {}
    } catch (error) {
      throw error
    }
  }
}

module.exports = BlogsRespository
