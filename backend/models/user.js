"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        require: true,
        validate: {
          min: 6,
          max: 20,
        },
      },
      email: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
        validate: {
          min: 10,
          max: 50,
        },
      },
      password: { type: DataTypes.STRING, require: true, validate: { min: 6 } },
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
