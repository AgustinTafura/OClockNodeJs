'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.hasMany(models.City);
      // define association here
    }
  };
  State.init({
    name: DataTypes.STRING,
    lat:  {
      type:DataTypes.STRING,
    },
    lng: {
      type:DataTypes.STRING,
    },
    createdAt: {
      // defaultValue: Date.now(),
      type: DataTypes.DATE
    },
    updatedAt: {
      // defaultValue: Date.now(),
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};
