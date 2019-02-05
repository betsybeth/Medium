const passport = require("passport")
const pushid = require("pushid")
const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")
const { development } = require("../../../config/config")
const db = require("../../../models/index")

passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: development.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        throw error
      }
    },
  ),
)

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userExist = await db.users.findOne({ where: { email } })
        if (userExist) {
          return done(null, false, {
            message: "user already exists",
          })
        }
        const userData = {
          id: pushid(),
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }
        const userCreate = await db.users.create(userData)
        return done(null, userCreate)
      } catch (error) {
        throw error
      }
    },
  ),
)

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await db.users.findOne({
          where: { email },
        })
        if (!user) {
          return done(null, false, { message: "User not found" })
        }
        const validatePassword = await db.users.isPassword(
          user.password,
          password,
        )
        if (!validatePassword) {
          return done(null, false, { message: "Wrong password" })
        }
        return done(null, user, { message: "logged in successfully" })
      } catch (error) {
        throw error
      }
    },
  ),
)
