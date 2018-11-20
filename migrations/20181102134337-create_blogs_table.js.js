'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('blogs', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInterface.dropTable('blogs');
  }
};
