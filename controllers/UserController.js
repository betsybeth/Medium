const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const UserRepository = require("../lib/repository/user")
// user controller

class UserController {
  static async createUser(req, res, next) {
    passport.authenticate("register", async (err, userExist, info) => {
      try {
        if (err || !userExist) {
          return res.status(409).send(info)
        }
        return res.status(201).send({
          success: true,
          message: "Account was successfully created",
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  }

  static async loginUser(req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          res.status(400).send(info)
        }
        req.login(user, config.development.jwtSession, async error => {
          if (error) return res.send(error)
          const body = { id: user.id, email: user.email }
          const token = jwt.sign({ user: body }, config.development.jwtSecret, {
            expiresInMinutes: 60,
          })
          return res.json({ token })
        })
      } catch (error) {
        return next(error)
      }
      return {}
    })(req, res, next)
  }

  static async getUser(req, res, next) {
    try {
      const user = await UserRepository.profileUser(req)
      if (user.msg) {
        return res.status(404).json(user.msg)
      }
      return res.status(200).json(user)
    } catch (error) {
      return next(error)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await UserRepository.updateUser(req)
      if (user.msg) {
        return res.status(400).json(user)
      }
      return res.status(200).send(user.message)
    } catch (error) {
      const err = new Error("something wrong happened", error)
      err.statusCode = 400
      return next(err)
    }
  }
}

module.exports = UserController
