'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.hasMany(models.Address);
      City.belongsTo(models.State, {
        foreignKey: {
          allowNull: false,
        }
      });
      // define association here
    }
  };
  City.init({
    name: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    // stateId: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    other:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'City',
    timestamps: false,
  });
  return City;
};
