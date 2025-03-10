const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/api/auth/register", auth.postUser);
router.post("/api/auth/login", auth.loginUser);
router.post("/api/auth/register-email", auth.postUserWithEmail);
router.post("/api/auth/login-email", auth.loginWithEmail);
router.get("/users", auth.getAllUser);
router.get("/api/users/:id", auth.getUserById);
router.post("/api/users/vouchers", auth.addVoucher);
router.get("/api/user/:user_id/vouchers", auth.getListVouchers)
router.get("/api/user/phone/:phone", auth.findUserByPhone)
router.post("/api/user/password/:phone", auth.forgotPassword)
router.put("/api/update_user/:id", auth.updateUser)
router.put("/api/update_password/:id", auth.updatePassword)
router.post("/api/verify_password", auth.verifyPassword)
router.delete("/api/user/:id", auth.deleteUser)

module.exports = router;
