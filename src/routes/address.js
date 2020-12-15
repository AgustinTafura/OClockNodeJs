const express = require('express');
const router = express.Router();

const {storeAddress} = require('../../controller/addressController');

router.post('/store',
  storeAddress
);



module.exports = router;
