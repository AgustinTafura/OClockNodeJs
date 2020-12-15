const express = require('express');
const router = express.Router();

const {storeEstablishment} = require('../../controller/establishmentController');

router.post('/store/', 
  storeEstablishment
);



module.exports = router;
