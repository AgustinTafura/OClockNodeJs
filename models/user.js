'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Address);
      User.hasMany(models.Booking);
      User.hasMany(models.Provider);
      User.hasMany(models.Company);
      // User.sync({ force: true });
      // define association here
    }
  };
  User.init({
    email:{
      allowNull:false,
      type:DataTypes.STRING,
      // unique: { msg: 'Email address already in use!' },
      validate: {
        isEmail: true,
        async isUnique(value) {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error('Username already exists!');
          }
        },
      },
    },
    surname: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate: {
        len: {
          args: [3,40],
          msg:"Minimum 3 characters required."
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: {
          args: [3,200],
          msg:"Minimum 3 characters required."
        },
      }
    },
    name: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate: {
        len: {
          args: [3,50],
          msg:"Minimum 3 characters required."
        }
      }
    },
    mobile_phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: {
          args: [6,50],
          msg:"Minimum 6 characters required."
        }
      }
    },
    birthdate:{
      type:DataTypes.DATE,
      allowNull:false,
      validate: {
        isDate: true,
      }
    },
    // addressId:{
    //   allowNull:false,
    //   // type:DataTypes.INTEGER,
    //   validate: {
    //     // allowNull:false,
    //     // isDate: true,
    //   }
    // },
    resetLink:{
      type:DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
