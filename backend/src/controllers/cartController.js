const Cart = require('../models/cartsModels'); 
const Product= require('../models/productsModels'); 

// Chưa handle hết trường hợp, check lại
const addProductToCart = async (req, res) => {
    const { user_id, product_id, variant_id, quantity } = req.body; // Lấy dữ liệu từ body request

    try {
        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ user_id });

        // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
        if (!cart) {
            cart = new Cart({ user_id, list_products: [] });
        }

        // Tìm sản phẩm dựa trên product_id
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Tìm biến thể của sản phẩm (nếu có variant_id)
        let selectedVariant = null;
        if (variant_id) {
            selectedVariant = product.prod_variations.find(
                (variant) => variant._id.toString() === variant_id
            );
            if (!selectedVariant) {
                return res.status(404).json({ message: 'Product variant not found' });
            }
        }

        // Kiểm tra sản phẩm và biến thể có tồn tại trong giỏ hàng không
        const productIndex = cart.list_products.findIndex(
            (item) => item.product_id.toString() === product_id && 
                      (variant_id ? item.variant_id?.toString() === variant_id : !item.variant_id)
        );

        if (productIndex !== -1) {
            // Nếu sản phẩm đã có trong giỏ hàng -> Cập nhật số lượng
            cart.list_products[productIndex].quantity += quantity;
        } else {
            // Sản phẩm hoặc biến thể chưa có trong giỏ hàng -> Thêm sản phẩm mới
            const newCartItem = {
                product_id,
                variant_id: selectedVariant ? selectedVariant._id : null, // Lưu variant_id nếu có
                prod_name: product.prod_name,
                variant_name: selectedVariant ? selectedVariant.variant_name : null, // Lưu tên biến thể nếu có
                variant_price: selectedVariant ? selectedVariant.variant_price : product.prod_price, // Lưu giá theo biến thể hoặc giá sản phẩm gốc
                quantity
            };

            // Thêm sản phẩm mới vào giỏ hàng
            cart.list_products.push(newCartItem);
        }

        // Lưu giỏ hàng
        await cart.save();

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
    }
};

module.exports={
    addProductToCart
}