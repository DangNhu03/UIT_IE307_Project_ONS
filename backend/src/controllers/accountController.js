const Location = require('../models/locationsModels'); 
const User = require('../models/usersModels'); 

// POST: Thêm địa điểm cho một người dùng cụ thể
const postLocation = async (req, res) => {
    try {
        const { loca_address, loca_phone, loca_per_name } = req.body;
        const { id } = req.params; // Lấy user_id từ URL

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newLocation = new Location({
            user_id: id,
            loca_address,
            loca_phone,
            loca_per_name
        });

        await newLocation.save();
        res.status(201).json({ message: 'Location added successfully', location: newLocation });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add location', error: error.message });
    }
};

// GET: Lấy tất cả các địa điểm
const getAllLocation = async (req, res) => {
    try {
        // Lấy tất cả địa điểm và populate thông tin người dùng
        const locations = await Location.find().populate('user_id', 'user_name user_phone');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve locations', error: error.message });
    }
};

// GET: Lấy tất cả các địa điểm của người dùng cụ thể
const getUserLocation = async (req, res) => {
    try {
        const { id } = req.params; // Lấy user_id từ URL

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Tìm tất cả địa điểm thuộc về user đó
        const userLocations = await Location.find({ user_id: id });
        res.status(200).json(userLocations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user locations', error: error.message });
    }
};


module.exports={
    postLocation,
    getAllLocation,
    getUserLocation,
}