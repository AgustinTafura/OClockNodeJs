'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User);
      this.hasOne(models.Establishment);
      // this.hasMany(models.Booking);
      this.belongsTo(models.City, {
        foreignKey: {
          allowNull: false,
        },
      });
      // this.sync({ force: true });
      // define association here
    }
  };
  Address.init({
    street: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {

      }
    },
    number: {
      type:DataTypes.INTEGER,
      validate: {

      }
    },
    postal_code: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
      }
    },
    floor: {
      type:DataTypes.STRING,
      validate: {

      }
    },
    apartment: {
      type:DataTypes.STRING,
      validate: {

      }
    },
    lat: {
      type:DataTypes.FLOAT,
      validate: {

      }
    },
    lng: {
      type:DataTypes.FLOAT,
      validate: {

      }
    },
    neighborhood: {
      type:DataTypes.STRING,
      validate: {

      }
    },
    // cityId: {
    //   type:DataTypes.INTEGER,
    //   validate: {
    //
    //   }
    // },
    country: {
      type:DataTypes.STRING,
      validate: {

      }
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
