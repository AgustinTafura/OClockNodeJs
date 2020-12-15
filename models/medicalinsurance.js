'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalInsurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MedicalInsurance.hasMany(models.Plan);
      // define association here
    }
  };
  MedicalInsurance.init({
    name: DataTypes.STRING,
    business_name: DataTypes.STRING,
    cuit: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_phone: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedicalInsurance',
  });
  return MedicalInsurance;
};
