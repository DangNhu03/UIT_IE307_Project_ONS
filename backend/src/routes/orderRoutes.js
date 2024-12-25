const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController')

router.post('/paymentmethods',order.postPaymentMethod)
router.get('/paymentmethods',order.getAllPaymentMethod)
router.post('/deliverymethods',order.postDeliveryMethod)
router.get('/deliverymethods',order.getAllDeliveryMethod)
router.post('/add', order.addOrder);
router.get('/', order.getAllOders);
router.get('/status/:user_id', order.getOrdersWithStatus);
router.put('/:order_id', order.updateOrderWithStatus);
router.post('/payment', order.onlinepPayment);
router.post('/check-status-transaction', order.checkTransaction);
router.post('/callback', order.checkPayment);
router.get('/no-review/:user_id', order.getAllProductNotReview);
router.get('/reviewed/:user_id', order.getAllProductRevieweded);

module.exports = router;