const express = require('express');
const router = express.Router();
const account = require('../controllers/accountController')

router.post('/locations/:user_id',account.postLocation)
router.get('/locations', account.getAllLocation)
router.get('/locations/:user_id', account.getUserLocation)
router.put('/locations/set-default/:user_id', account.setAddressDefault)

module.exports = router;