const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/users", auth.postUser);
router.get("/users", auth.getAllUser);
router.get("/users/:id", auth.getUserWithLocation);
router.post("/users/vouchers", auth.addVoucher);

module.exports = router;
