const Notification = require("../models/notificationModels");

// POST: Thêm một notification mới
const postNotification = async (req, res) => {
  try {
    const { noti_title, noti_content, noti_image, noti_type } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!noti_title || !noti_content || !noti_image || !noti_type) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    // Tạo thông báo mới với thời gian hiện tại
    const newNotification = new Notification({
      noti_title,
      noti_content,
      noti_image,
      noti_type,
      noti_time: new Date(),
    });

    // Lưu vào database
    await newNotification.save();

    res
      .status(201)
      .json({
        message: "Thông báo đã được tạo",
        notification: newNotification,
      });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// GET: Lấy tất cả các notification
const getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ noti_time: -1 }); // Sắp xếp theo thời gian (mới nhất trước)
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
module.exports = {
  postNotification,
  getAllNotification,
};
