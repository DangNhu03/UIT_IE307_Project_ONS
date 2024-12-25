const mongoose = require("mongoose");
const Reviews = require('../models/reviewsModels');
const Users = require("../models/usersModels"); // Model Users
const Products = require("../models/productsModels"); // Model Products
const Orders = require("../models/ordersModels");

// POST: Thêm một review mới
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
        res.status(200).json({ message: "Review added successfully", data: savedReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};

const addReviewByUser = async (req, res) => {
    try {
        console.log('req.body ne: ', req.body)
        const { user_id, prod_id, prod_variant_name, revi_rating, revi_content, revi_img, order_id } = req.body;

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

        // Kiểm tra order_id hợp lệ và tồn tại
        if (!mongoose.Types.ObjectId.isValid(order_id)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }
        const orderExists = await Orders.findById(order_id);
        if (!orderExists) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Kiểm tra nếu revi_img là một mảng nếu có
        if (revi_img && !Array.isArray(revi_img)) {
            return res.status(400).json({ message: "revi_img must be an array" });
        }

        // Tạo review mới
        const newReview = new Reviews({
            user_id,
            prod_id,
            prod_variant_name,
            revi_rating,
            revi_content,
            revi_img,
        });

        // Lưu review vào cơ sở dữ liệu
        const savedReview = await newReview.save();

        // Cập nhật trạng thái is_reviewed và review_id trong list_items của Orders
        const updatedOrder = await Orders.findOneAndUpdate(
            {
                _id: order_id, // Tìm đơn hàng theo order_id
                "list_items.product_id": prod_id, // Tìm phần tử trong list_items có product_id khớp
            },
            {
                $set: {
                    "list_items.$.is_reviewed": true, // Đánh dấu sản phẩm đã được review
                    "list_items.$.review_id": savedReview._id, // Thêm review ID
                },
            },
            { new: true } // Trả về dữ liệu đã cập nhật
        );


        if (!updatedOrder) {
            return res.status(404).json({ message: "Order item not found or update failed" });
        }

        res.status(200).json({
            message: "Review added and order updated successfully",
            review: savedReview,
            order: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding review and updating order", error: error.message });
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

const getReviewByProductId = async (req, res) => {
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
const deleteReview = async (req, res) => {
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

const updateReview = async (req, res) => {
    try {
        const { review_id } = req.params;
        const { revi_rating, revi_content, revi_img } = req.body;
        console.log('reviewid', review_id)
        console.log('revi rating', revi_rating)
        if (!mongoose.Types.ObjectId.isValid(review_id)) {
            return res.status(400).json({ message: "ID đánh giá không hợp lệ" });
        }

        // Kiểm tra nếu revi_img là một mảng nếu có
        if (revi_img && !Array.isArray(revi_img)) {
            return res.status(400).json({ message: "revi_img must be an array" });
        }

        const updatedReview = await Reviews.findByIdAndUpdate(
            review_id,
            { $set: { revi_rating, revi_content, revi_img } },
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
    getReviewByProductId,
    addReviewByUser
};