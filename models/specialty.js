'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Booking);
      this.hasMany(models.Provider);
      this.hasMany(models.Service);
      this.belongsTo(models.Category);
      // define association here
    }
  };
  Specialty.init({
    name: DataTypes.STRING,
    // categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};
