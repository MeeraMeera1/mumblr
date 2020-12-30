'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, { foreignKey: "userId" });
    Follow.belongsTo(models.User, { foreignKey: "followId" });
  };
  return Follow;
};