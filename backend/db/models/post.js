'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contentUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 10]
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Tag, { foreignKey: "postId" });
    Post.hasMany(models.Reblog, { foreignKey: "postId" });
    Post.hasMany(models.Reply, { foreignKey: "postId" });
    Post.hasMany(models.Like, { foreignKey: "postId" });
  };
  return Post;
};