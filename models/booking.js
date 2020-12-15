'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Booking.hasMany(models.User);
      this.belongsTo(models.User);
      // this.belongsTo(models.Address);
      this.belongsTo(models.Provider);
      // this.belongsTo(models.Specialty);
      this.belongsTo(models.Service);
      this.belongsTo(models.Status, {
        foreignKey: {
          allowNull: false,
        }
      });
      // define association here
    }
  };
  Booking.init({
    // userId: DataTypes.INTEGER,
    // addressId: DataTypes.INTEGER,
    // providerId: DataTypes.INTEGER,
    // specialtyId: DataTypes.INTEGER,
    // serviceId: DataTypes.INTEGER,
    // statusId: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    finish_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
