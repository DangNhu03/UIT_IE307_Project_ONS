const express = require('express');
const router = express.Router();
const review = require('../controllers/reviewController')

router.post('/',review.addReview)
router.get('/', review.getAllReview)
router.get('/:product_id', review.getReviewByProductId)
router.put('/:review_id', review.updateReview)
router.delete("/reviews/:review_id", review.deleteReview);

module.exports = router;