const {Model, DataTypes} = require("sequelize");

const sequelize = require("../config/connection")

class User extends Model {}

User.init(
  {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  },
  {

      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
  }
);

module.exports = User