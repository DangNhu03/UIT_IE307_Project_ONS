const PaymentMethod = require('../models/payimentmethodsModels'); 
const DeliveryMethod = require('../models/deliverymethodsModels');

// POST: Thêm phương thức thanh toán
const postPaymentMethod = async (req, res) => {
    try {
        const { pay_name } = req.body;  
        const newPaymentMethod = new PaymentMethod({ pay_name }); 
        const savedPaymentMethod = await newPaymentMethod.save();  
        res.status(201).json({ message: "Payment method created", paymentMethod: savedPaymentMethod });
    } catch (error) {
        res.status(500).json({ message: "Failed to create payment method", error: error.message });
    }
};

// GET: Lấy tất cả các phương thức thanh toán
const getAllPaymentMethod = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find(); 
        res.status(200).json({ message: "Payment methods retrieved", paymentMethods });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve payment methods", error: error.message });
    }
};

// POST: Thêm phương thức giao hàng
const postDeliveryMethod = async (req, res) => {
    try {
        const { deli_name, deli_cost } = req.body;  
        const newDeliveryMethod = new DeliveryMethod({ deli_name, deli_cost });  
        const savedDeliveryMethod = await newDeliveryMethod.save(); 
        res.status(201).json({ message: "Delivery method created", deliveryMethod: savedDeliveryMethod });
    } catch (error) {
        res.status(500).json({ message: "Failed to create delivery method", error: error.message });
    }
};

// GET: Lấy tất cả các phương thức giao hàng
const getAllDeliveryMethod = async (req, res) => {
    try {
        const deliveryMethods = await DeliveryMethod.find();  
        res.status(200).json({ message: "Delivery methods retrieved", deliveryMethods });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve delivery methods", error: error.message });
    }
};

module.exports = {
    postPaymentMethod,
    getAllPaymentMethod,
    postDeliveryMethod,
    getAllDeliveryMethod,
};