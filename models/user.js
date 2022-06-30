'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    // intUserID: {
    //   type: DataTypes.INTEGER(11),
    //   autoIncrement: true,
    //   allowNull: false,
    //   primaryKey: true
    // },
    strName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    strPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dtmDOB: {
      type: DataTypes.RANGE(DataTypes.DATE),
      allowNull: false,
    },
    blnIsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};