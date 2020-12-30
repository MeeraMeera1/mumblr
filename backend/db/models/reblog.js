'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reblog = sequelize.define('Reblog', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Reblog.associate = function(models) {
    // associations can be defined here
    Reblog.belongsTo(models.Post, { foreignKey: "postId" });
    Reblog.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Reblog;
};