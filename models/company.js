'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * this method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
        }
      });
      this.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        }
      });
      // define association here
    }
  };
  Company.init({
    name: DataTypes.STRING,
    cuit: DataTypes.INTEGER,
    contact_phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    // categoryId: DataTypes.INTEGER,
    // establishmentId: DataTypes.INTEGER,
    website: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};
