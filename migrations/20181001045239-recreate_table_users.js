'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        unique:true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        field: 'username',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        field: 'email',
        unique: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field:'updated_at',
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
