const express = require('express');
const router = express.Router();
const product = require('../controllers/productController')


router.post('/categories',product.postCategories)
router.get('/categories', product.getAllCategories)
router.post('/',product.postProduct)
router.get('/', product.getAllProduct)


module.exports = router;