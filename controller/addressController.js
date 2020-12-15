const { Op, Sequelize } = require("sequelize");
const {sequelize, Address, Establishment, City, User, Category, Specialty , Provider, EstablishmentType}  = require('../models/index');


module.exports = {


  storeAddress :   (req, res) => {
    try {
      const{street_name, street_number,floor, apartment, zip, city, cityId, state , country, lat, lng} = req.body;

         Address.create({
          street: street_name,
          number: street_number,
          postal_code: zip,
          country,
          floor,
          lat: lat,
          lng: lng,
          apartment,
          CityId: cityId,
          createdAt: new Date(),
          updatedAt: new Date(),

        }).then(function(newAddress){
          req.session.newAddressId = newAddress.dataValues.id;
          // console.log('nuevaDireccion', newAddress);
          console.log('OKKKKK ADDRESS');
          return newAddress
        }).catch(function(err){
          console.log('ERROR ADDRESS');
          console.log(err);
          // req.session.dataForm = {email,name,surname,mobile_phone,year,month,day}
          // req.session.errors = {};
          // const errors = err.errors;
          // console.log(errors);
          // for(var key in errors){
          //   for (item in req.body) {
          //     if(item === errors[key].path){
          //         req.session.errors[item] = errors[key].message;
          //     }
          //   }
          //
          // }
          // done(null, false,  /*req.flash('error','the email does not exist.')*/);
        });


      return res.status(201).json('Address Stored')
    } catch (error) {

      return res.status(500).json(error)
    }
  },


}
