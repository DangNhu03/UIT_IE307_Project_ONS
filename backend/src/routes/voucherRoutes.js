const express = require('express');
const router = express.Router();
const voucher = require('../controllers/voucherController')


router.post('/',voucher.postVoucher)
router.get('/',voucher.getAllVoucher)


module.exports = router;