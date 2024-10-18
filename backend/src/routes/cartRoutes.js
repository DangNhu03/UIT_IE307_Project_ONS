const express = require('express');
const router = express.Router();
const cart = require('../controllers/cartController');

router.post('/add', cart.addProductToCart);

module.exports = router;
