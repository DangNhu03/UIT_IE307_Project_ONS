const mongoose = require("mongoose");
const Reviews = require('../models/reviewsModels');
const Users = require("../models/usersModels"); // Model Users
const Products = require("../models/productsModels"); // Model Products

// POST: Thêm một voucher mới
const addReview = async (req, res) => {
    try {
        const { user_id, prod_id, prod_variant_name, revi_rating, revi_content, revi_img } = req.body;

        // Kiểm tra user_id hợp lệ và tồn tại
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const userExists = await Users.findById(user_id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Kiểm tra prod_id hợp lệ và tồn tại
        if (!mongoose.Types.ObjectId.isValid(prod_id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const productExists = await Products.findById(prod_id);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Kiểm tra nếu revi_img là một mảng nếu có
        if (revi_img && !Array.isArray(revi_img)) {
            return res.status(400).json({ message: "revi_img must be an array" });
        }

        // Tạo review mới
        const newReview = new Reviews({
            user_id,
            prod_id,
            prod_variant_name, // Có thể để trống nếu không cần
            revi_rating,
            revi_content,
            revi_img, // Nếu có ảnh, sẽ được lưu vào
        });

        // Lưu review vào cơ sở dữ liệu
        const savedReview = await newReview.save();
        res.status(201).json({ message: "Review added successfully", data: savedReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};


// GET: Lấy tất cả các review
const getAllReview = async (req, res) => {
    try {
        const reviews = await Reviews.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
    }
};

const getReviewByProductId = async(req, res)=>{
    try {
        console.log('get danh gia theo id san pham')
        const { product_id } = req.params;
        // Kiểm tra nếu prod_id không hợp lệ
        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            console.log(product_id)
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const reviews = await Reviews.find({ prod_id: product_id })
            .populate("user_id", "user_name user_email user_avatar") // Populate thông tin người dùng
            .sort({ created_at: -1 }); // Sắp xếp giảm dần theo ngày tạo

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this product." });
        }

        res.status(200).json({ message: "Reviews fetched successfully", data: reviews });
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
}
const deleteReview = async(req, res)=>{
    try {
        const reviewId = req.params.id;

        const deletedReview = await Reviews.findByIdAndDelete(reviewId);

        if (deletedReview) {
            res.status(200).json({ message: "Review deleted successfully", data: deletedReview });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error: error.message });
    }
}

const updateReview = async(req, res)=>{
    try {
        const reviewId = req.params.id;
        const { revi_rating, revi_content, prod_variations } = req.body;

        const updatedReview = await Reviews.findByIdAndUpdate(
            reviewId,
            { $set: { revi_rating, revi_content, prod_variations } },
            { new: true } // Trả về tài liệu sau khi cập nhật
        );

        if (updatedReview) {
            res.status(200).json({ message: "Review updated successfully", data: updatedReview });
        } else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating review", error: error.message });
    }
}

module.exports = {
    addReview,
    deleteReview,
    updateReview,
    getAllReview,
    getReviewByProductId
};