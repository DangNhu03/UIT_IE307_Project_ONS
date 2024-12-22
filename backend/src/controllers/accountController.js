const Location = require('../models/locationsModels'); 
const User = require('../models/usersModels'); 
const mongoose = require("mongoose");

// POST: Thêm địa điểm cho một người dùng cụ thể
const postLocation = async (req, res) => {
  const { user_id } = req.params;
  const {
    loca_address,
    loca_address_province,
    loca_address_district,
    loca_address_commue,
    loca_address_detail,
    loca_phone,
    loca_per_name,
    is_default
  } = req.body;

  try {
    // Kiểm tra xem người dùng có địa chỉ nào chưa
    const existingLocations = await Location.find({ user_id });

    // Nếu chưa có địa chỉ nào, đặt is_default = true
    const isFirstLocation = existingLocations.length === 0;

    // Nếu địa chỉ được đánh dấu là mặc định, đặt is_default = false cho các địa chỉ khác của user
    if (is_default || isFirstLocation) {
      await Location.updateMany(
        { user_id },
        { is_default: false }
      );
    }

    // Tạo địa chỉ mới
    const newLocation = new Location({
      user_id,
      loca_address,
      loca_address_province,
      loca_address_district,
      loca_address_commue,
      loca_address_detail,
      loca_phone,
      loca_per_name,
      is_default: is_default || isFirstLocation, // Mặc định là true nếu là địa chỉ đầu tiên
    });

    // Lưu địa chỉ vào cơ sở dữ liệu
    const savedLocation = await newLocation.save();

    return res.status(201).json({
      message: "Thêm địa chỉ thành công.",
      data: savedLocation,
    });
  } catch (error) {
    console.error("Lỗi khi thêm địa chỉ:", error);
    return res.status(500).json({ error: "Có lỗi xảy ra trên máy chủ." });
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
        const { user_id } = req.params; // Lấy user_id từ URL

        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Tìm tất cả địa điểm thuộc về user đó
        const userLocations = await Location.find({ user_id: user_id });
        const defaultLocation = await User.findById(user_id).populate({
              path: "local_default_id.voucher_id", // Populate voucher_id
              model: "vouchers", // Tên model 'vouchers'
            });
        res.status(200).json(userLocations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user locations', error: error.message });
    }
};
const setAddressDefault = async (req, res) => {
    try {
        const { user_id } = req.params;  
        const { address_id } = req.body; 
        if (!mongoose.Types.ObjectId.isValid(address_id)) {
            return res.status(400).json({ message: "ID địa chỉ không hợp lệ" });
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const updateUser = await User.findByIdAndUpdate(
            user_id,
            { local_default_id: address_id },
            { new: true }
        );
        if (!updateUser)
            return res.status(404).json({ message: "Not found user" });
        await Location.findOneAndUpdate(
            { user_id: user_id, is_default: true },
            { is_default: false },
            { new: true }
        );
        const updateDefault = await Location.findByIdAndUpdate(
            address_id,
            { is_default: true },
            { new: true }
        );
        if (!updateDefault)
            return res
                .status(404)
                .json({ message: "Set default not success!" });
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        console.error('Error occurred:', error);  // In lỗi chi tiết
        res.status(500).json({ message: error.message });
    }
};
// GET: Lấy địa điểm mặc định của người dùng cụ thể
const getUserDefaultLocation = async (req, res) => {
  try {
    const { user_id } = req.params;  


    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const defaultLocation = await Location.findOne({ user_id: user_id, is_default: true });

    if (!defaultLocation) {
      return res.status(404).json({ message: 'Default location not found' });
    }

    res.status(200).json(defaultLocation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve default location', error: error.message });
  }
};
// Hàm chỉnh sửa địa chỉ
const editAddress = async (req, res) => {
  try {
      const { user_id, address_id } = req.params; // Lấy user_id và address_id từ params
      const address = req.body; // Lấy thông tin địa chỉ từ body
      console.log(address)

      // Kiểm tra ID hợp lệ
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
          return res.status(400).json({ message: "ID người dùng không hợp lệ" });
      }
      if (!mongoose.Types.ObjectId.isValid(address_id)) {
          return res.status(400).json({ message: "ID địa chỉ không hợp lệ" });
      }

      // Cập nhật địa chỉ
      const updatedAddress = await Location.findOneAndUpdate(
          { _id: address_id, user_id: user_id },
          { ...address },
          { new: true }
      );

      // Kiểm tra nếu không tìm thấy địa chỉ
      if (!updatedAddress) {
          return res.status(404).json({ message: "Không tìm thấy địa chỉ để cập nhật" });
      }

      // Trả về kết quả thành công
      res.status(200).json({ message: "Cập nhật thành công", data: updatedAddress });
  } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { user_id, address_id } = req.params; // Lấy user_id và address_id từ params

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }
    if (!mongoose.Types.ObjectId.isValid(address_id)) {
      return res.status(400).json({ message: "ID địa chỉ không hợp lệ" });
    }

    // Tìm địa chỉ bị xóa để kiểm tra trạng thái mặc định
    const addressToDelete = await Location.findOne({ _id: address_id, user_id: user_id });

    if (!addressToDelete) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ để xóa" });
    }

    // Xóa địa chỉ
    const deletedAddress = await Location.findOneAndDelete({
      _id: address_id,
      user_id: user_id,
    });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Không tìm thấy địa chỉ để xóa" });
    }

    // Nếu địa chỉ bị xóa là mặc định, đặt địa chỉ khác làm mặc định
    if (addressToDelete.is_default) {
      // Tìm địa chỉ đầu tiên còn lại trong danh sách và đặt làm mặc định
      const newDefaultAddress = await Location.findOneAndUpdate(
        { user_id: user_id },
        { is_default: true },
        { new: true, sort: { createdAt: 1 } } // Sắp xếp theo thời gian tạo
      );

      if (newDefaultAddress) {
        console.log("Đã đặt địa chỉ mới làm mặc định:", newDefaultAddress);
      }
    }

    // Trả về kết quả thành công
    res.status(200).json({ message: "Xóa thành công", data: deletedAddress });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports={
    postLocation,
    getAllLocation,
    getUserLocation,
    setAddressDefault,
    getUserDefaultLocation,
    editAddress,
    deleteAddress
}