const { Op, Sequelize } = require("sequelize");
const {sequelize, Address, Establishment, City, State, User, Category, Specialty , Provider, EstablishmentType}  = require('../models/index');

module.exports = {

  getCitiesEstablishments :  async(req, res) => {
    try {
      const cities = await Establishment.findAll({
        attributes: [],
        include: [
          {
            model:Address,
            attributes: ['cityId'],
            include: {
              model: City,
            },
          }
        ],
      })
      return res.status(201).json({
        cities
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({})
      return res.status(201).json({
        categories
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  getEstablishmentsType: async (req, res) => {
    const {category_id} = req.query;
    // console.log(category_id);
    // console.log(category_id == '');
    // return res.status(500).json({category_id})
    try {
      if(category_id == ''){
        var establishmentTypes = await EstablishmentType.findAll()
      } else {
        var establishmentTypes = await EstablishmentType.findAll({where: {CategoryId:category_id}})
      }

      return res.status(201).json({
        establishmentTypes
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  getSpecialties: async (req, res) => {
    try {
      const specialties = await Specialty.findAll({ where: {CategoryId : req.params.categoryId}})
      return res.status(201).json({
        specialties
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },


  dataProviderCompany: async (req, res) => {
    try {
      const {name, category_id, specialty_id, category_id_min, category_id_max } = req.query;

      const providers = await Provider.findAll({
        attributes: [ 'id',[Sequelize.col('Specialty.name'), 'specialty'],[Sequelize.col('User.name'), 'name'],[Sequelize.col('User.surname'), 'surname']],
        where: {
          SpecialtyId: {
            [Op.between]: [category_id_min, category_id_max]
          },
          '$user.name$': {
            [Op.like]:  '%'+name+'%'
          },
        },
        include: [
          {
            model: User,
            attributes: [],
          }, {
            model: Specialty,
            attributes: [],
          }
        ],
      })

      if(category_id != 0){
        console.log(1111111111111111111);
        console.log(category_id);
        var establishments = await Establishment.findAll({
          attributes: ['id', 'name', [Sequelize.col('EstablishmentType.name'), 'type']],
          where: {
            name: {
              [Op.like]:  '%'+name+'%'
            },
            '$EstablishmentType.CategoryId$': category_id,
          },
          include: {
            model: EstablishmentType,
            attributes: [],
          }
        })
      } else {
        console.log(22222222222222222222);
        var establishments = await Establishment.findAll({
          attributes: ['id', 'name', [Sequelize.col('EstablishmentType.name'), 'type']],
          where: {
            name: {
              [Op.like]:  '%'+name+'%'
            },
            // '$EstablishmentType.CategoryId$': category_id,
          },
          include: {
            model: EstablishmentType,
            attributes: [],
          }
        })
      }

      return res.status(201).json({
        providers, establishments
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  dataEstablishments: async (req, res) => {
    try {
      const {name, category_id, specialty_id} = req.query;

      console.log(category_id);
      var establishments = await Establishment.findAll({
        attributes: ['id', 'name', [Sequelize.col('EstablishmentType.name'), 'type']],
        where: {
          name: {
            [Op.like]: '%'+name+'%',
          },
          '$EstablishmentType.CategoryId$': category_id,
        },
        include: {
          model: EstablishmentType,
          attributes: [],
        }
      })
      return res.status(201).json({
        establishments
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  getStates: async (req, res) => {
    try {
      const states = await State.findAll({})
      return res.status(201).json({
        states
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  getCitiesByState: async (req, res) => {
    try {
      const {stateId, limit, name} = req.query;

      const cities = await City.findAll(
        {
          limit: 5,
          where:{
            stateId,
            name: {
              [Op.like]: '%'+name+'%',
            },
          },
        }
      )
      return res.status(201).json({
        cities
      });
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },


}
