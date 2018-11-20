'use strict'
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const blogs = sequelize.define('blogs', {
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
      allowNull: false,   
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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

  }, {});
  blogs.associate = function(models) {
    //association can be defined here
    blogs.hasMany(models.comments,{
      foreignKey : 'comment_id',
      onDelete: 'CASCADE'
    })
  };
  return blogs;
};