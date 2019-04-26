const db = require("../../models/index")

class UserRepository {
  static async profileUser(req, next) {
    const user = await db.users.findOne({
      where: {
        id: req.user.id,
      },
    })
    if (!user) {
      return next({ msg: "user not found" })
    }
    delete user.dataValues.password
    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt
    return { message: user }
  }

  static async updateUser(req) {
    try {
      const { userId } = req.params
      const findUserById = await db.users.findOne({
        where: {
          id: userId,
        },
        raw: true,
      })
      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
      if (findUserById) {
        if (req.body.password || req.body.email || req.body.username) {
          await db.users.update(
            {
              username: userData.username,
              password: userData.password,
              email: userData.email,
            },
            {
              individualHooks: true,
              where: {
                id: userId,
              },
            },
          )

          return { message: " user has been updated successfully" }
        }
        throw new Error("payload required")
      }
      return { msg: "User not found" }
    } catch (error) {
      return new Error(error)
    }
  }
}
module.exports = UserRepository
