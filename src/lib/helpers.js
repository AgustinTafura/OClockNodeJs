const bcrypt = require('bcryptjs'); // modulo para encriptar
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const {sequelize}  = require('../../models/index'); // coneccion a DB para poder guardar y consultar


const helpers = {};


//para encriptar la contraseña
helpers.encryptPassword = async (password) => {

  const salt = await bcrypt.genSalt(10);  //patron para el hash. Mas alto el numero mas alto el cifrado, pero mas lento
  const hash = await bcrypt.hash(password, salt); //creo contrasena cifrada
  return hash
}

//metodo para login, compara contraseña
helpers.matchPassword = async(password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
}





module.exports = helpers;
