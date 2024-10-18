const Voucher = require('../models/vouchersModels'); 

// POST: Thêm một voucher mới
const postVoucher = async (req, res) => {
    try {
        const { vouc_code, vouc_discount_type, vouc_discount_value, vouc_min_order_value, vouc_start_date, vouc_end_date, vouc_max_uses, vouc_is_active } = req.body;
        
        // Tạo voucher mới với dữ liệu từ request body
        const newVoucher = new Voucher({
            vouc_code,
            vouc_discount_type,
            vouc_discount_value,
            vouc_min_order_value,
            vouc_start_date,
            vouc_end_date,
            vouc_max_uses,
            vouc_is_active
        });

        // Lưu voucher vào database
        await newVoucher.save();
        res.status(201).json({ message: 'Voucher created successfully', voucher: newVoucher });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create voucher', error: error.message });
    }
};

// GET: Lấy tất cả các voucher
const getAllVoucher = async (req, res) => {
    try {
        const vouchers = await Voucher.find(); 
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve vouchers', error: error.message });
    }
};

module.exports = {
    postVoucher,
    getAllVoucher,
};