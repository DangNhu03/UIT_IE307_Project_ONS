const Cart = require('../models/cartsModels'); 
const ProductVariation = require('../models/variationsModels'); 

// Chưa handle hết trường hợp, check lại
const addProductToCart = async (req, res) => {
    const { user_id, variations_id, name, quantity } = req.body;

    try {
        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ user_id });

        // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
        if (!cart) {
            cart = new Cart({ user_id, list_products: [] });
        }

        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng không
        const productIndex = cart.list_products.findIndex(
            (product) => product.variations_id.toString() === variations_id
        );

        if (productIndex !== -1) {
            // Sản phẩm đã có trong giỏ hàng -> Cập nhật số lượng
            cart.list_products[productIndex].quantity += quantity;
        } else {
            // Sản phẩm chưa có trong giỏ hàng -> Thêm sản phẩm mới
            const productVariation = await ProductVariation.findById(variations_id);
            if (!productVariation) {
                return res.status(404).json({ message: 'Product variation not found' });
            }

            cart.list_products.push({
                variations_id,
                name,
                quantity,
            });
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