'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Like.init(
    {
      userId: { type: DataTypes.INTEGER, field: 'user_id' },
      postId: { type: DataTypes.INTEGER, field: 'post_id' },
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
