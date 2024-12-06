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
  const { user_id, voucher_id } = req.body; // Lấy user_id và voucher_id từ request body

  try {
    // Kiểm tra sự tồn tại của voucher trong cơ sở dữ liệu
    const voucher = await Voucher.findById(voucher_id);
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra xem voucher đã có trong danh sách voucher của người dùng chưa
    const voucherExists = user.list_vouchers.some(item => item.voucher_id.toString() === voucher_id.toString());

    if (voucherExists) {
      return res.status(400).json({ message: "Voucher already added to the user" });
    }

    // Thêm voucher vào danh sách voucher của người dùng
    user.list_vouchers.push({ voucher_id: voucher_id, is_used: false });
    await user.save(); // Lưu người dùng sau khi cập nhật

    // Trả về thông báo thành công và dữ liệu người dùng mới
    res.status(201).json({ message: "Voucher added to user successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add voucher to user", error: error.message });
  }
};


// GET: Lấy thông tin người dùng thông qua id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy user_id từ URL

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

// GET: Lấy danh sách voucher của người dùng
const getListVouchers = async (req, res) => {
  const { user_id } = req.params; // Lấy user_id từ URL

  try {
    // Tìm người dùng và populate voucher_id
    const user = await User.findById(user_id).populate({
      path: 'list_vouchers.voucher_id', // Populate voucher_id
      model: 'vouchers', // Tên model 'vouchers'
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Chỉ lấy thông tin từ voucher_id và trả về dưới dạng mảng
    const vouchers = user.list_vouchers.map(item => item.voucher_id);

    // Trả về danh sách voucher
    res.status(200).json({
      message: "List of vouchers fetched successfully",
      vouchers, // Chỉ trả về danh sách voucher
    });
    console.log(JSON.stringify(vouchers, null, 2)); // Log ra để kiểm tra
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch vouchers", error: error.message });
  }
};




module.exports = {
  postUser,
  getAllUser,
  addVoucher,
  getListVouchers,
  getUserById,
  loginUser,
};
