const Category = require('../models/categoriesModels');
const Product = require('../models/productsModels');
const ProductVariation = require('../models/variationsModels');



// POST: Thêm mới danh mục
const postCategories = async (req, res) => {
    try {

        const { cate_name } = req.body;

        // Kiểm tra nếu tên danh mục trống
        if (!cate_name) {
            return res.status(400).json({ message: "Category name is required." });
        }

        const newCategory = new Category({ cate_name });

        await newCategory.save();

        res.status(201).json({
            message: "Category created successfully.",
            category: newCategory
        });
    } catch (error) {

        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};


// GET: Lấy tất cả các danh mục
const getAllCategories = async (req, res) => {
    try {

        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {

        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

// POST: Thêm mới sản phẩm
const postProduct = async (req, res) => {
    try {
        // Lấy thông tin sản phẩm từ body request
        const {
            cate_id,
            prod_name,
            prod_price,
            date_start_sale,
            date_end_sale,
            prod_discount,
            prod_stock,
            prod_sold,
            prod_avg_rating,
            prod_review_count,
            prod_image
        } = req.body;

        const newProduct = new Product({
            cate_id,
            prod_name,
            prod_price,
            date_start_sale,
            date_end_sale,
            prod_discount,
            prod_stock,
            prod_sold,
            prod_avg_rating,
            prod_review_count,
            prod_image
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
};

// GET: Lấy tất cả sản phẩm
const getAllProduct = async (req, res) => {
    try {
        // Tìm tất cả sản phẩm và lấy thông tin category
        const products = await Product.find().populate('cate_id');

        // Trả về danh sách sản phẩm
        res.status(200).json({
            message: "Products retrieved successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve products",
            error: error.message
        });
    }
};


// POST: Thêm biến thể cho sản phẩm
const postVariationForProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const {
            prod_price,
            prod_stock_quantity,
            prod_image,
            prod_variations
        } = req.body;

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Tạo biến thể cho sản phẩm
        const newVariation = new ProductVariation({
            prod_id: productId,
            prod_price,
            prod_stock_quantity,
            prod_image,
            prod_variations
        });

        // Lưu biến thể vào database
        const savedVariation = await newVariation.save();

        res.status(201).json({
            message: "Product variation created successfully",
            variation: savedVariation
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create product variation",
            error: error.message
        });
    }
};

//GET: Lấy sản phẩm cùng với các biến thể 
const getProductWithVariations = async (req, res) => {
    try {
        const { productId } = req.params;

        // Tìm sản phẩm và các biến thể liên quan
        const product = await Product.findById(productId);
        const variations = await ProductVariation.find({ prod_id: productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product and variations retrieved successfully",
            product,
            variations
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve product and variations",
            error: error.message
        });
    }
};
module.exports = {
    postCategories,
    getAllCategories,
    postProduct,
    getAllProduct,
    postVariationForProduct,
    getProductWithVariations,
};
