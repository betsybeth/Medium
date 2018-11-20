
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

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
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync()
        console.log("jjjkjkj", salt)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  users.associate = function(models) {
     users.hasMany(models.blogs, {
       foreignKey : 'userId',
       onDelete:  'CASCADE'
     })     // associations can be defined here
  };
  users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword)
  }

  return users;
};