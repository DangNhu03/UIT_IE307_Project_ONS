const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/api/auth/register", auth.postUser);
router.post("/api/auth/login", auth.loginUser);
router.get("/users", auth.getAllUser);
router.get("/api/users/:id", auth.getUserById);
router.post("/api/users/vouchers", auth.addVoucher);
router.get("/api/user/:user_id/vouchers", auth.getListVouchers)

module.exports = router;
