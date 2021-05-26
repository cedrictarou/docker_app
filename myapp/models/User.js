'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Like }) {
      User.hasMany(Post, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      // User.belongsToMany(Post, {
      //   through: Like,
      //   foreignKey: 'user_id',
      //   otherKey: 'post_id',
      //   as: 'likes',
      // });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
