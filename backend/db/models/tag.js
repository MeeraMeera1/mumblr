'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.Post, { foreignKey: "postId" });
  };
  return Tag;
}; 