const Sequelize = require("sequelize")

module.exports = sequelize => {
  const settings = sequelize.define("settings", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      field: "email",
      validate: {
        notEmpty: { msg: "email should not be empty" },
      },
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
  })
  return settings
}
