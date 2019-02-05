const Sequelize = require("sequelize")

module.exports = sequelize => {
  const blogs = sequelize.define(
    "blogs",
    {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        field: "title",
        validate: {
          notEmpty: { msg: "title should not be empty" },
        },
      },
      description: {
        type: Sequelize.STRING,
        field: "description",
        validate: {
          notEmpty: { msg: "description should not be empty" },
        },
      },
      likes: {
        type: Sequelize.INTEGER,
        field: "claps",
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
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
    {},
  )
  blogs.associate = function(models) {
    // association can be defined here
    blogs.hasMany(models.comments, {
      foreignKey: "comment_id",
      onDelete: "CASCADE",
    })
  }
  return blogs
}
