'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Establishment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Establishment.belongsToMany(models.Provider, { through: models.EstablishmentProvider });
      Establishment.belongsTo(models.Address, {
        foreignKey: {
          unique: true,
          allowNull: false,
          defaultValue: 4,
        }
      });
      Establishment.belongsTo(models.EstablishmentType, {
        foreignKey: {
          allowNull: false,
        }
      });
        // this.sync({ force: true });
      // define association here
    }
  };
  Establishment.init({
    name: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Establishment',
  });
  return Establishment;
};
