const pushid = require("pushid")
const db = require("../../models/index")

class UserRepository {
  static async profileUser(req) {
    const user = await db.users.findOne({
      where: {
        id: req.user.id,
      },
    })
    return user
  }

  static async updateUser(req) {
    const { userId } = req.params
    const findUserById = await db.users.findByPk(userId)
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }
    if (findUserById) {
      await db.users.update(userData, {
        where: {
          id: userId,
        },
      })

      return { message: " user has been updated successfully" }
    }
    return { msg: "User not found" }
  }

  static async settings(req) {
    try {
      const userData = {
        id: pushid(),
        email: req.body.email,
        userId: req.user.id,
      }
      const checkEmailExists = await db.users.findOne({
        where: {
          id: req.user.id,
        },
      })
      if (checkEmailExists) {
        return await this.updateUser(req)
      }
      return { msg: "user not found" }
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserRepository
