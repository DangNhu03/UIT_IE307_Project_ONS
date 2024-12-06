const express = require("express");
const router = express.Router();
const noti = require("../controllers/notificationController");

router.post("/", noti.postNotification);
router.get("/", noti.getAllNotification);


module.exports = router;