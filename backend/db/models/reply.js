'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.User, { foreignKey: "userId" });
    Reply.belongsTo(models.Post, { foreignKey: "postId" });
  };
  return Reply;
};