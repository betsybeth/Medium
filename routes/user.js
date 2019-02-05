const express = require("express")
const passport = require("passport")
const UserController = require("../controllers/UserController")
const { validate } = require("../lib/userValidations.middleware")
const { blogValidate } = require("../lib/blogsValidations.middleware")
const { commentValidate } = require("../lib/commentsValidations.middleware")
const config = require("../config/config")
const BlogController = require("../controllers/BlogController")
const CommentsController = require("../controllers/CommentsController")

const router = express.Router()

router.post("/register", validate, UserController.createUser)
router.post("/login", validate, UserController.loginUser)
router.post(
  "/blogs",
  passport.authenticate("jwt", config.development.jwtSession),
  blogValidate,
  BlogController.create,
)
router.put(
  "/blogs/:blogid",
  passport.authenticate("jwt", config.development.jwtSession),
  blogValidate,
  BlogController.update,
)
router.delete(
  "/blogs/:blogid",
  passport.authenticate("jwt", config.development.jwtSession),
  BlogController.delete,
)
router.post(
  "/blog/:blogid/postComment",
  passport.authenticate("jwt", config.development.jwtSession),
  commentValidate,
  CommentsController.create,
)
router.put(
  "/blog/:blogid/postComment/:commentId",
  passport.authenticate("jwt", config.development.jwtSession),
  commentValidate,
  CommentsController.update,
)
router.delete(
  "/blog/:blogid/postComment/:commentId",
  passport.authenticate("jwt", config.development.jwtSession),
  CommentsController.delete,
)
router.get(
  "/user",
  passport.authenticate("jwt", config.development.jwtSession),
  UserController.getUser,
)
router.put(
  "/settings/:userId",
  passport.authenticate("jwt", config.development.jwtSession),
  UserController.settingsUser,
)
router.post("/blog/:blogid/react")

module.exports = router
