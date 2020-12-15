'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstablishmentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EstablishmentType.hasMany(models.Establishment);
      EstablishmentType.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
        }
      });
      // define association here
    }
  };
  EstablishmentType.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'EstablishmentType',
  });
  return EstablishmentType;
};
