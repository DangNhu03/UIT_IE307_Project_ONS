const PaymentMethod = require("../models/payimentmethodsModels");
const DeliveryMethod = require("../models/deliverymethodsModels");
const Location = require("../models/locationsModels");
const User = require("../models/usersModels");
const Order = require("../models/ordersModels");
const Voucher = require("../models/vouchersModels");
const Cart = require("../models/cartsModels");

// POST: Thêm phương thức thanh toán
const postPaymentMethod = async (req, res) => {
  try {
    const { pay_name } = req.body;
    const newPaymentMethod = new PaymentMethod({ pay_name });
    const savedPaymentMethod = await newPaymentMethod.save();
    res.status(201).json({
      message: "Payment method created",
      paymentMethod: savedPaymentMethod,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create payment method",
      error: error.message,
    });
  }
};

// GET: Lấy tất cả các phương thức thanh toán
const getAllPaymentMethod = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res
      .status(200)
      .json({ message: "Payment methods retrieved", paymentMethods });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve payment methods",
      error: error.message,
    });
  }
};

// POST: Thêm phương thức giao hàng
const postDeliveryMethod = async (req, res) => {
  try {
    const { deli_name, deli_cost } = req.body;
    const newDeliveryMethod = new DeliveryMethod({ deli_name, deli_cost });
    const savedDeliveryMethod = await newDeliveryMethod.save();
    res.status(201).json({
      message: "Delivery method created",
      deliveryMethod: savedDeliveryMethod,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create delivery method",
      error: error.message,
    });
  }
};

// GET: Lấy tất cả các phương thức giao hàng
const getAllDeliveryMethod = async (req, res) => {
  try {
    const deliveryMethods = await DeliveryMethod.find();
    res
      .status(200)
      .json({ message: "Delivery methods retrieved", deliveryMethods });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve delivery methods",
      error: error.message,
    });
  }
};

// POST: Thêm 1 đơn hàng
const addOrder = async (req, res) => {
  try {
    const {
      user_id,
      order_status,
      order_total_price,
      order_final_price,
      order_delivery_id,
      order_payment_id,
      order_note,
      shipping_cost,
      voucher_id,
      loca_id,
      list_items,
    } = req.body;

    if (
      !user_id ||
      !order_status ||
      !order_total_price ||
      !order_final_price ||
      !order_delivery_id ||
      !order_payment_id ||
      !shipping_cost ||
      !loca_id ||
      !list_items
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const userExists = await User.findById(user_id);
    if (!userExists)
      return res.status(400).json({ message: "User not found." });

    const deliveryMethodExists = await DeliveryMethod.findById(
      order_delivery_id
    );
    if (!deliveryMethodExists)
      return res.status(400).json({ message: "Delivery method not found." });

    const paymentMethodExists = await PaymentMethod.findById(order_payment_id);
    if (!paymentMethodExists)
      return res.status(400).json({ message: "Payment method not found." });

    const locationExists = await Location.findById(loca_id);
    if (!locationExists)
      return res.status(400).json({ message: "Location not found." });

    if (voucher_id) {
      const voucher = await Voucher.findById(voucher_id);
      if (!voucher)
        return res.status(400).json({ message: "Voucher not found." });

      if (voucher.vouc_is_active && voucher.vouc_max_uses > 0) {
        voucher.vouc_max_uses -= 1;
        await voucher.save();

        const userVoucherIndex = userExists.list_vouchers.findIndex(
          (v) => v.voucher_id.toString() === voucher_id.toString()
        );

        if (userVoucherIndex !== -1) {
          userExists.list_vouchers[userVoucherIndex].is_used = true;
          await userExists.save();
        } else {
          return res
            .status(400)
            .json({ message: "Voucher not found in user's list." });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Voucher is no longer valid or out of uses." });
      }
    }
    const newOrder = new Order({
      user_id,
      order_status,
      order_total_price,
      order_final_price,
      order_delivery_id,
      order_payment_id,
      order_note,
      shipping_cost,
      voucher_id,
      loca_id,
      list_items,
    });

    await newOrder.save();
    await Cart.updateOne(
      { user_id },
      {
        $pull: {
          list_products: {
            $or: [
              {
                product_id: { $in: list_items.map((item) => item.product_id) },
              },
              {
                variant_id: { $in: list_items.map((item) => item.variant_id) },
              },
            ],
          },
        },
      }
    );
    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

// GET: Lấy tất cả các đơn hàng
const getAllOders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({ message: "Orders retrieved", order });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve Orders",
      error: error.message,
    });
  }
};

// GET: Lấy các đơn hàng theo trạng thái của người dùng
const getOrdersWithStatus = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { status } = req.query; 

    if (!user_id || !status) {
      return res.status(400).json({ message: "Thiếu user_id hoặc status" });
    }

    const orders = await Order.find({
      user_id: user_id,
      order_status: status,
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const updateOrderWithStatus = async (req, res) => {
  try {
    const { order_id } = req.params; 
    const { order_status } = req.body;

    if (!order_status) {
      return res.status(400).json({ message: "Order status is required." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      { order_status },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.status(200).json({ message: "Order status updated successfully.", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error, try again later." });
  }
};

module.exports = {
  postPaymentMethod,
  getAllPaymentMethod,
  postDeliveryMethod,
  getAllDeliveryMethod,
  addOrder,
  getAllOders,
  getOrdersWithStatus,
  updateOrderWithStatus,

};
