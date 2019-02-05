module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("users", {
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
          notEmpty: { msg: "username should not be empty" },
        },
      },
      password: {
        type: Sequelize.STRING,
        field: "password",
        validate: {
          notEmpty: { msg: "username should not be empty" },
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
    }),
  down: queryInterface => queryInterface.dropTable("users"),
}
