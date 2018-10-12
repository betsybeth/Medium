
const Sequelize = require('sequelize')
'use strict';
module.exports = (sequelize) => {
  const users = sequelize.define('users', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    username:{
      type: Sequelize.STRING,
      field: 'username',
      allowNull: false,
    }, 
    email:{
        type: Sequelize.STRING,
        unique: true,
        field: 'email',
        allowNull: false,   
    }, 
    password:{
        type: Sequelize.STRING,
        field: 'password',
        allowNull: false,
        
    },
    createdAt: {
      allowNull: false,
      field:'created_at',
      type: Sequelize.DATE
    },
    updatedAt: {
      field:'updated_at',
      type: Sequelize.DATE
    }
  }, {});
  users.associate = function(models) {
     users.hasMany(models.blogs, {
       foreignKey : 'user_id',
       onDelete:  'CASCADE'
     })

    
    // associations can be defined here
  };
  return users;
};