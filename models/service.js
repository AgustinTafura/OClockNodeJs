'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Booking);
      this.belongsTo(models.Specialty);
      // define association here
    }
  };
  Service.init({
    name: DataTypes.STRING,
    // specialtyId: DataTypes.INTEGER,
    recommendation: DataTypes.TEXT,
    requirement: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
