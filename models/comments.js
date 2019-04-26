const Sequelize = require("sequelize")

module.exports = sequelize => {
  const comments = sequelize.define(
    "comments",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      comment: {
        type: Sequelize.STRING,
        field: "comment",
        validate: {
          notEmpty: { msg: "comment should not be empty" },
        },
      },
      writtenBy: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE,
      },
      blogId: {
        type: Sequelize.STRING,
        references: {
          model: "blogs",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {},
  )
  // comments.associate = models => {
  //   // association can be defined here
  //   comments.belongsTo(models.blogs, {
  //     foreignKey: "blogId",
  //     onDelete: "CASCADE",
  //   })
  // }
  return comments
}
