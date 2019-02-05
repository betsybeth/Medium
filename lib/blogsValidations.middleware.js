exports.blogValidate = (req, res, next) => {
  req
    .checkBody("title", "Title is required")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Title should be more than 10 words")

  req
    .checkBody("description", "description is required")
    .notEmpty()
    .isLength({ min: 30 })
    .withMessage("Description should be more than 30 words")

  const errors = req.validationErrors()
  if (errors) {
    return res.status(400).json({ errors })
  }
  return next()
}
