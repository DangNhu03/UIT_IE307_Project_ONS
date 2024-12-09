const express = require("express");
const router = express.Router();
// const chat = require("../controllers/chatControllerhehe");
const chat = require("../controllers/chatController");

// router.get('/:chatId', chat.getChatHistory);
// router.post('/:chatId/message', chat.sendMessage);
// router.post('/:chatId/bot-response', chat.getBotResponse);
// Tạo phòng chat
// router.post("/", chat.createChat);

// // Lấy thông tin phòng chat
// router.get("/:chatId", chat.getChatById);

// // Lấy danh sách phòng chat của người dùng
// router.get("/user/:userId", chat.getUserChats);

// // Xóa phòng chat
// router.delete("/:chatId", chat.deleteChat);

// Route gửi tin nhắn và nhận phản hồi từ bot
router.post("/message", chat.sendMessage);

// Route lấy lịch sử tin nhắn của người dùng
router.get("/messages/:userId", chat.getUserChatHistory);

module.exports = router;
