const Sequelize = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = sequelize => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: Sequelize.STRING,
        field: "username",
        validate: {
          notEmpty: { msg: "username should not be empty" },
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        field: "email",
        validate: {
          notEmpty: { msg: "email should not be empty" },
        },
      },
      password: {
        type: Sequelize.STRING,
        field: "password",
        validate: {
          notEmpty: { msg: "password should not be empty" },
        },
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE,
      },
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        },
        afterUpdate: user => {
          const salt = bcrypt.genSaltSync()
          console.log("ghjkll")
          user.password = bcrypt.hashSync(user.password, salt)
        },
      },
    },
  )
  users.associate = models => {
    users.hasMany(models.blogs, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    })
    users.hasMany(models.comments, {
      foreignKey: "writtenBy",
      onDelete: "CASCADE",
    })
    users.hasOne(models.settings, {
      foreignKey: "userId",
      OnDelete: "CASCADE",
    }) // associations can be defined here
  }
  users.isPassword = (encodedPassword, password) =>
    bcrypt.compareSync(password, encodedPassword)

  return users
}
