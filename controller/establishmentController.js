const { Op, Sequelize } = require("sequelize");
const {sequelize, Address, Establishment, EstablishmentType, City}  = require('../models/index');


module.exports = {


  storeEstablishment :  async  (req, res) => {
    try {
      const{name, verify, establishment_id, category_id, company_email, company_contact_phone} = req.body;
      addressId = (req.session.newAddressId)? req.session.newAddressId: await Address.findOne({ limit: 1, order: [ [ 'createdAt', 'DESC' ]], attributes: ['id'],});
        await  Establishment.create({
          name,
          verify,
          EstablishmentTypeId: establishment_id,
          AddressId:   addressId.id,
          createdAt: new Date(),
          updatedAt: new Date(),

        }).then(function(newEstablishment){
          req.session.newEstablishmentId = newEstablishment.dataValues.id;
          console.log('OKKKKK Establishment');
          return newEstablishment;
        }).catch(function(err){
          console.log('ERROR ESTABLISHMENT');
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
      console.log(error);
      return res.status(500).json(error)
    }
  },


}
