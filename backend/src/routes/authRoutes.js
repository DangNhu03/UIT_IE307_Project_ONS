const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/api/auth/register", auth.postUser);
router.post("/api/auth/login", auth.loginUser);
router.get("/users", auth.getAllUser);
router.get("/users/:id", auth.getUserWithLocation);
router.post("/users/vouchers", auth.addVoucher);

module.exports = router;
