const { Op, Sequelize } = require("sequelize");
const {sequelize, Address, Establishment, City, User, Category, Specialty , Provider, EstablishmentType, State}  = require('../models/index');

module.exports = {

  providerStore :  async(req, res) => {

    try {
      const {cuit, license_number, license_number_required, contact_phone, specialty_id } = req.body
      console.log('papapapa');
      userId = req.user.id;

      await  Provider.create({
        cuit,
        license_number,
        contact_phone,
        SpecialtyId:   specialty_id,
        UserId:   userId,
        createdAt: new Date(),
        updatedAt: new Date(),

      }).then(function(newProvider){
        req.session.newProviderId = newProvider.dataValues.id;
        console.log('OKKKKK Provider');
        return newProvider;

      }).catch(function(err){
        console.log('ERROR al crear provider');
        console.log(err);
      });


      return res.status(201).json('provider Validated')
    } catch (error) {

      return res.status(500).json(error)
    }
  },

  providerValidator :  async(req, res) => {
    try {
      const {cuit, license_number, license_number_required /*contact_phone*/ } = req.query
      const errors = {};
      (cuit.length == 11)? '': errors.cuit = 'Debes contener 11 caracteres numéricos.';

      if(license_number_required === 'true'){
        (license_number.length >= 3)? '': errors.license_number = 'Debe contener 3 caracteres como mínimo.'
      }

      if(JSON.stringify(errors) !== JSON.stringify({})){
        throw errors
      }
      return res.status(201).json('provider Validated')
    } catch (error) {

      return res.status(500).json(error)
    }
  },

  bookingValidator :  async(req, res) => {
    try {
      const {dataDays, appointment_duration, date_start } = req.query
      const errors = {};

      (appointment_duration != '')? '' :errors.appointment_duration = 'Debes seleccionar la duracion de tus turnos';
      (date_start != '')? '' :errors.date_start = 'Debes seleccionar una fecha';

      if(JSON.stringify(errors) !== JSON.stringify({})){
        throw errors
      }

      return res.status(201).json('booking Validated')
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  addressValidator :   (req, res) => {
    try {

      const{street_name, street_number,floor, apartment, zip, cityId, state , country} = req.query;
      const errors = {};
      console.log('CITY:', City.findOne({where:{id:cityId}}));

      (street_name.length > 3 && street_name.length < 120)? '':errors.street_name = 'Debe contener 3 caracteres como mínimo.';
      (street_number.match('[0-9]+$') &&  street_number.length > 0)? '': errors.street_number = 'Debes contener 11 caracteres numéricos.';
      (zip.length > 0)? '': errors.zip = 'Debe completar este campo.';

      (  City.findOne({where:{id:cityId}}))? console.log(City.findOne({where:{id:cityId}})): errors.city = 'Debe completar este campo.';
      (  State.findOne({where:{id:state}}))? console.log(State.findOne({where:{id:state}})): errors.state = 'Debe completar este campo.';


      if(JSON.stringify(errors) !== JSON.stringify({})){
        throw errors;
      }

      return res.status(201).json('address Validated')
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  establishmentValidator :  async(req, res) => {
    try {

      const{establishment_name, company_contact_phone,company_email, category_id, establishment_id} = req.query;
      const errors = {};

      (establishment_name.length >= 3 && establishment_name.length < 120)? '':errors.establishment_name = 'Debe contener 3 caracteres como mínimo.';
      (company_contact_phone.match( /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) &&  company_contact_phone.length > 8)? '': errors.company_contact_phone = 'Debes contener 8 caracteres numéricos como minimo.';
      (await Category.findOne({where:{id:category_id}}))? '': errors.category_id = 'Seleccione una categoria.';
      (await EstablishmentType.findOne({where:{id:establishment_id}}))? '': errors.establishment_id = 'Seleccione un tipo de Establecimiento.';



      if(JSON.stringify(errors) !== JSON.stringify({})){
        throw errors;
      }

      return res.status(201).json('establishment Validated')
    } catch (error) {
      return res.status(500).json(error)
    }
  },


}
