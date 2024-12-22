const express = require('express');
const router = express.Router();
const account = require('../controllers/accountController')

router.post('/locations/:user_id',account.postLocation)
router.get('/locations', account.getAllLocation)
router.get('/locations/:user_id', account.getUserLocation)
router.put('/locations/set-default/:user_id', account.setAddressDefault)
router.delete('/locations/delete-address/:user_id/:address_id', account.deleteAddress);
router.put('/locations/edit-address/:user_id/:address_id', account.editAddress);

module.exports = router;