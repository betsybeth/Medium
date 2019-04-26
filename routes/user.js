const express = require("express")
const passport = require("passport")
const UserController = require("../controllers/UserController")
const {
  validateRegisterAndLogin,
  validateUpdateUser,
} = require("../lib/userValidations.middleware")

const { blogValidate } = require("../lib/blogsValidations.middleware")
const { commentValidate } = require("../lib/commentsValidations.middleware")
const config = require("../config/config")
const BlogController = require("../controllers/BlogController")
const CommentsController = require("../controllers/CommentsController")

const router = express.Router()

router.post("/register", validateRegisterAndLogin, UserController.createUser)
router.post("/login", validateRegisterAndLogin, UserController.loginUser)
router.post(
  "/blogs",
  passport.authenticate("jwt", config.development.jwtSession),
  blogValidate,
  BlogController.create,
)
router.put(
  "/blogs/:blogId",
  passport.authenticate("jwt", config.development.jwtSession),
  blogValidate,
  BlogController.update,
)
router.delete(
  "/blogs/:blogId",
  passport.authenticate("jwt", config.development.jwtSession),
  BlogController.delete,
)
router.put("/blogs/:blogId/react", BlogController.react)
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
router.get("/blogs/:blogId", BlogController.get)
router.put(
  "/settings/:userId",
  passport.authenticate("jwt", config.development.jwtSession),
  UserController.updateUser,
)

module.exports = router
