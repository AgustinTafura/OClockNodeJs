const express = require('express');
const router = express.Router();

var sequelize = require('../database');

// router.get('/', async (req , res) => {
//   sequelize.sync({force: false}).then( async () => {
//     console.log('Connection has been established successfully.');
//     const addresses = await sequelize.query("SELECT * FROM addresses", { type: sequelize.QueryTypes.SELECT });
//     console.log(addresses);
//     res.send({addresses });
//   }).catch(error => {
//     console.error('Unable to connect to the database:', error);
//   });
//
// })

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/search', (req, res) => {
  res.render('search')
})




module.exports = router;
