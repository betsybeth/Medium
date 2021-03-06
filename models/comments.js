const Sequelize = require('sequelize');

'use strict';
module.exports = (sequelize) => {
  const comments = sequelize.define('comments', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
       unique: true
    },
    comment: {
      type:Sequelize.STRING,
      field: 'comment',
      allowNull:false,
    },
    writtenBy: {
      type: Sequelize.STRING,
      field: 'written_by'
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
        type:Sequelize.INTEGER,
        references: {
           model: 'blogs',
           key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    }
  }, {});
  return comments;
};