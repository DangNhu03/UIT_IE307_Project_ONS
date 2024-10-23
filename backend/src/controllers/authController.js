const User = require('../models/usersModels'); // Model của users
const Voucher = require('../models/vouchersModels'); // Model của vouchers

// POST: Thêm người dùng mới
const postUser = async (req, res) => {
    try {
        const { user_name, user_phone, user_email, user_pass, local_default_id } = req.body;

        const newUser = new User({
            user_name,
            user_phone,
            user_email,
            user_pass,
            local_default_id
        });

        // Lưu người dùng mới vào database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

// GET: Lấy tất cả người dùng
const getAllUser = async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả người dùng từ DB
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
};

// POST: Thêm voucher cho người dùng
const addVoucher = async (req, res) => {
    try {
        const { user_id, voucher_id } = req.body;

        // Kiểm tra xem voucher có tồn tại không
        const voucher = await Voucher.findById(voucher_id);
        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        // Thêm voucher vào list_vouchers của người dùng
        const user = await User.findByIdAndUpdate(
            user_id,
            { $addToSet: { list_vouchers: voucher_id } }, // Thêm voucher vào mảng nếu chưa có
            { new: true } // Trả về tài liệu người dùng đã cập nhật
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({ message: 'Voucher added to user successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add voucher to user', error: error.message });
    }
};


// GET: Lấy thông tin người dùng cùng với thông tin địa chỉ từ local_default_id
const getUserWithLocation = async (req, res) => {
    try {
        const { id } = req.params; // Lấy user_id từ URL

        // Tìm người dùng và populate thêm thông tin của địa chỉ từ local_default_id
        const user = await User.findById(id).populate('local_default_id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user and location', error: error.message });
    }
};

module.exports = {
    postUser,
    getAllUser,
    addVoucher,
    getUserWithLocation,
};