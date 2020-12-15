const express = require('express');
const router = express.Router();

const {storeAddress, getGoogleLatLng} = require('../../controller/addressController');

router.post('/store',
  storeAddress
);

module.exports = router;
