const mysql = require('mysql2');
const { database } = require('./keys');

const { Sequelize, DataTypes  } = require('sequelize');

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect:  'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);





module.exports =  sequelize;
