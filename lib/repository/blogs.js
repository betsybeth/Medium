const pushid = require("pushid")
const Sequelize = require("sequelize")
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
      return { message: "Created successfully", blogs }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async updateBlog(req) {
    try {
      const { blogId } = req.params
      const blogUpdateData = {
        title: req.body.title,
        description: req.body.description,
      }
      const findBlogById = await db.blogs.findByPk(blogId)
      if (!findBlogById) {
        return { msg: "Blog not found" }
      }
      await db.blogs.update(blogUpdateData, {
        where: { id: blogId },
      })
      return { message: "blog has been successfully updated" }
    } catch (error) {
      throw error
    }
  }

  static async getBlogs(req) {
    const { blogId } = req.params
    if (blogId) {
      console.log("here")
      const getOneBlog = await db.blogs.findByPk(blogId, {
        include: [
          {
            model: db.comments,
            as: "comments",
          },
        ],
        plain: true,
      })
      console.log("dkdkd", getOneBlog)
      return { message: getOneBlog }
    }
    return { msg: "Empty" }
  }

  static async reactToBlog(req) {
    const { blogId } = req.params
    const getBlog = await db.blogs.findByPk(blogId)
    if (getBlog) {
      const votes = getBlog.dataValues.likes + 1
      await db.blogs.update(
        { likes: votes },
        {
          where: {
            id: blogId,
          },
        },
      )
      return {
        message: `successfully update ${votes}`,
      }
    }
    return { msg: " blog not found" }
  }

  static async deleteBlog(req) {
    try {
      const blog = await db.blogs.findByPk(req.params.blogId)
      if (!blog) {
        return { msg: "Blog does not exist" }
      }
      await db.blogs.destroy({
        where: {
          id: req.params.blogId,
        },
      })
      return {}
    } catch (error) {
      throw error
    }
  }
}

module.exports = BlogsRespository
