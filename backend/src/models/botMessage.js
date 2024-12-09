const mongoose = require("mongoose");

const botMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", // Liên kết đến người dùng
    required: true,
  },
});

module.exports = mongoose.model("BotMessage", botMessageSchema);
