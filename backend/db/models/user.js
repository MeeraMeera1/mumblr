'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Must be a numberic value'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  }, 
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });

  //returns an object with the USER instance information that is safe to save to a JWT
  User.prototype.toSafeObject = function() {
    const { id, username, email, age} = this;
    return {id, username, email, age};
  }; 

  //checks to see if users instance password matchs the given password
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  //return a user with the given id using currentUser scope
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id)
    }
  }

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: "userId" });
    User.hasMany(models.Like, { foreignKey: "userId" });
    User.hasMany(models.Follow, { foreignKey: "userId" });
    User.hasMany(models.User, { foreignKey: "followId" });
    User.hasMany(models.Reply, { foreignKey: "userId" });
    User.hasMany(models.Reblog, { foreignKey: "userId" });
  };
  return User;
};