const express = require('express');
const router = express.Router();
const {isLoggedIn,  isNotLoggedIn } = require('../lib/auth');

const {bookingValidator, bookingStore} = require('../../controller/bookingController');



router.get('/validation',
  bookingValidator
);
//
router.post('/store',
  bookingStore
);


module.exports = router;
