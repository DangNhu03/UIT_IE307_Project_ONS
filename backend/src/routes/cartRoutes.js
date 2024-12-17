const express = require('express');
const router = express.Router();
const cart = require('../controllers/cartController');

router.post('/add', cart.addProductToCart);
router.get('/:user_id', cart.getProductInCart);
router.put('/:user_id', cart.updateQuantityInCart);
router.post('/:user_id', cart.removeProductFromCart);
router.get('/quantity/:user_id', cart.getQuantityInCart);


module.exports = router;
