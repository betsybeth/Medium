exports.commentValidate = (req, res, next) => {
  req.checkBody("comment", " Comment is required").notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    return res.status(400).json({ errors })
  }
  return next()
}
