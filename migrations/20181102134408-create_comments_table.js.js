'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      comment: {
        type:Sequelize.STRING,
        field: 'comment',
        allowNull:false
      },
      writtenBy: {
        type: Sequelize.STRING,
        field: 'written_by',
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      },
      blogId: {
        type:Sequelize.STRING,
        references: {
           model: 'blogs',
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
    return queryInterface.dropTable('comments');
  }
};
