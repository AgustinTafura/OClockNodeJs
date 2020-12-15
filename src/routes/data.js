const express = require('express');
const router = express.Router();
const {getCategories, getCitiesEstablishments, getSpecialties, dataProviderCompany, getEstablishmentsType, dataEstablishments, getCitiesByState, getStates} = require('../../controller/dataController');


router.get('/category',
  getCategories
);

router.get('/getCitiesByState',
  getCitiesByState
)

router.get('/states',
  getStates
);

router.get('/city',
  getCitiesEstablishments
);

router.get('/specialties/:categoryId',
  getSpecialties
);

router.get('/dataProviderCompany',
  dataProviderCompany
);

router.get('/dataEstablishments',
  dataEstablishments
);


router.get('/establishmentsType/',
  getEstablishmentsType
);



module.exports = router;
