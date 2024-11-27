const User = require("../models/usersModels"); // Model của users
const Voucher = require("../models/vouchersModels"); // Model của vouchers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const SerectKey = "Lamcam";

const createToken = (_id) => {
  return jwt.sign({ _id }, SerectKey, { expiresIn: "1h" });
};

// POST: Thêm người dùng mới
const postUser = async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
  
      if (!name || !phone || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await User.findOne({ user_phone: phone });
  
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          user_name: name,
          user_phone: phone,
          user_email: email,
          user_pass: hashedPassword,
          local_default_id: new mongoose.Types.ObjectId(),
        });
  
        await newUser.save();
        console.log("new user", newUser);
  
        const token = await createToken(newUser._id);
        res.status(201).json([newUser, token]);
      }
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ message: error.message });
    }
  };
  

// POST: Đăng nhập
const loginUser = async (req, res) => {
    try {
      const { phone, password } = req.body; 
      console.log(req.body);
  
      if (!phone || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
      }
  
      const user = await User.findOne({ user_phone: phone });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("found user", user);
  
      const match = await bcrypt.compare(password, user.user_pass);
      console.log(match);
  
      if (!match) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = createToken(user._id);
      res.status(200).json([user, token]);
      console.log("Login success");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
  

// GET: Lấy tất cả người dùng
const getAllUser = async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả người dùng từ DB
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

// POST: Thêm voucher cho người dùng
const addVoucher = async (req, res) => {
  try {
    const { user_id, voucher_id } = req.body;

    // Kiểm tra xem voucher có tồn tại không
    const voucher = await Voucher.findById(voucher_id);
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }

    // Thêm voucher vào list_vouchers của người dùng
    const user = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { list_vouchers: voucher_id } }, // Thêm voucher vào mảng nếu chưa có
      { new: true } // Trả về tài liệu người dùng đã cập nhật
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(201)
      .json({ message: "Voucher added to user successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add voucher to user", error: error.message });
  }
};

// GET: Lấy thông tin người dùng cùng với thông tin địa chỉ từ local_default_id
const getUserWithLocation = async (req, res) => {
  try {
    const { id } = req.params; // Lấy user_id từ URL

    // Tìm người dùng và populate thêm thông tin của địa chỉ từ local_default_id
    const user = await User.findById(id).populate("local_default_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve user and location",
        error: error.message,
      });
  }
};

module.exports = {
  postUser,
  getAllUser,
  addVoucher,
  getUserWithLocation,
  loginUser,
};
