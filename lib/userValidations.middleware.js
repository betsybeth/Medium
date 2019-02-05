exports.validate = (req, res, next) => {
  if (req.originalUrl === "/register") {
    req.checkBody("username", "Username is required").notEmpty()
    req
      .checkBody("email", "Email is required")
      .notEmpty()
      .isEmail()
      .withMessage("Invalid Email")
    req
      .checkBody("password", "Password is required")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage(" Password must contain 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
    const errors = req.validationErrors()
    if (errors) {
      return res.status(400).json({ errors })
    }
  }
  if (req.originalUrl === "/login") {
    req
      .checkBody("email", "Email is required")
      .notEmpty()
      .isEmail()
      .withMessage("Invalid Email")
    req
      .checkBody("password", "Password is required")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage(" Password must contain 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
    const errors = req.validationErrors()
    if (errors) {
      return res.status(400).json({ errors })
    }
  }
  return next()
}
