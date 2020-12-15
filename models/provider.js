'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Booking);
      this.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        }
      });
      this.belongsToMany(models.Establishment, { through: models.EstablishmentProvider });
      this.belongsTo(models.Specialty);
      // define association here
    }
  };
  Provider.init({
    cuit: DataTypes.INTEGER,
    license_number: DataTypes.INTEGER,
    contact_phone: DataTypes.INTEGER,
    // userId: DataTypes.INTEGER,
    // companyId: DataTypes.INTEGER,
    // specialtyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};
