const express = require('express');
const router = express.Router();
const {isLoggedIn,  isNotLoggedIn } = require('../lib/auth');

const {bookingValidator, providerValidator, addressValidator, establishmentValidator, providerStore} = require('../../controller/providerController');

router.get('/form', isLoggedIn, (req, res) => {
    res.render('form')
})


router.get('/booking/validation',
  bookingValidator
);

router.get('/validation',
  providerValidator
);

router.post('/store', isLoggedIn,
  providerStore
);

router.get('/address/validation',
  addressValidator
);

router.get('/establishment/validation',
  establishmentValidator
);

module.exports = router;
