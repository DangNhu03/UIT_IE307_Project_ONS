const Cart = require("../models/cartsModels");
const Product = require("../models/productsModels");

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
      return res.status(404).json({ message: "Product not found" });
    }

    // Tìm biến thể của sản phẩm (nếu có variant_id)
    let selectedVariant = null;
    if (variant_id) {
      selectedVariant = product.prod_variations.find(
        (variant) => variant._id.toString() === variant_id
      );
      if (!selectedVariant) {
        return res.status(404).json({ message: "Product variant not found" });
      }
    }

    const image = selectedVariant
      ? selectedVariant.variant_image
      : product.prod_image[0];

    const stock = selectedVariant
      ? selectedVariant.variant_stock_quantity
      : product.prod_stock;

    const productIndex = cart.list_products.findIndex(
      (item) =>
        item.product_id.toString() === product_id &&
        (variant_id
          ? item.variant_id?.toString() === variant_id
          : !item.variant_id)
    );

    if (productIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng -> Cập nhật số lượng
      cart.list_products[productIndex].quantity += quantity;
    } else {
      const newCartItem = {
        product_id,
        variant_id: selectedVariant ? selectedVariant._id : null,
        prod_name: product.prod_name,
        prod_discount: product.prod_discount,
        image,
        stock,
        variant_name: selectedVariant ? selectedVariant.variant_name : null,
        price: selectedVariant
          ? selectedVariant.variant_price
          : product.prod_price,
        quantity,
      };

      cart.list_products.push(newCartItem);
    }

    // Lưu giỏ hàng
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product to cart", error: error.message });
  }
};

const getProductInCart = async (req, res) => {
  const { user_id } = req.params; // Lấy user_id từ URL

  try {
    // Tìm giỏ hàng theo user_id
    const cart = await Cart.findOne({ user_id });
    
    // Trả về danh sách sản phẩm trong giỏ hàng
    res.status(200).json({
      message: "Cart retrieved successfully",
      cart: cart.list_products, // Trả về tất cả sản phẩm trong giỏ hàng
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve cart", error: error.message });
  }
};

const updateQuantityInCart = async (req, res) => {
  const { user_id, product_id, variant_id, quantity } = req.body; // Lấy dữ liệu từ body request

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  try {
    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.list_products.findIndex(
      (item) =>
        item.product_id.toString() === product_id &&
        (variant_id
          ? item.variant_id?.toString() === variant_id
          : !item.variant_id)
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Không có sản phẩm trong giỏ hàng" });
    }

    // Cập nhật số lượng sản phẩm
    cart.list_products[productIndex].quantity = quantity;

    // Lưu giỏ hàng với số lượng đã cập nhật
    await cart.save();

    res.status(200).json({
      message: "Product quantity updated successfully",
      cart: cart.list_products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product quantity in cart",
      error: error.message,
    });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
const removeProductFromCart = async (req, res) => {
  const { user_id, product_id, variant_id } = req.body; // Lấy user_id, product_id, và variant_id từ body request

  try {
    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ user_id });

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Tìm index của sản phẩm cần xóa
    const productIndex = cart.list_products.findIndex(
      (item) =>
        item.product_id.toString() === product_id.toString() &&
        (variant_id
          ? item.variant_id.toString() === variant_id.toString()
          : true)
    );

    // Nếu không tìm thấy sản phẩm, trả về lỗi
    if (productIndex === -1) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    cart.list_products.splice(productIndex, 1);

    // Lưu giỏ hàng sau khi xóa sản phẩm
    await cart.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully", cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error removing product from cart",
      error: err.message,
    });
  }
};
const getQuantityInCart = async (req, res) => {
  try {
    // Lấy user_id từ tham số URL
    const { user_id } = req.params;

    // Tìm giỏ hàng của người dùng dựa trên user_id
    const cart = await Cart.findOne({ user_id });

    const totalQuantity = cart ? cart.list_products.length : 0;

    // Trả về tổng số lượng sản phẩm
    return res.status(200).json({ totalQuantity });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    return res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {
  addProductToCart,
  getProductInCart,
  updateQuantityInCart,
  removeProductFromCart,
  getQuantityInCart,
};
