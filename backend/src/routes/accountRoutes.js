const express = require('express');
const router = express.Router();
const account = require('../controllers/accountController')

router.post('/locations/:id',account.postLocation)
router.get('/locations', account.getAllLocation)
router.get('/locations/:id', account.getUserLocation)


module.exports = router;