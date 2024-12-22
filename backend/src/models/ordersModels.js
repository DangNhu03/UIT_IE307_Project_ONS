const mongoose = require("mongoose");

let Schema = mongoose.Schema;


let OrdersSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    order_status: { type: String, required: true },
    order_total_price: { type: Number, required: true },
    order_final_price: { type: Number, required: true }, // có cộng ship
    order_delivery_id: { type: Schema.Types.ObjectId, ref: "deliverymethods", required: true },
    order_payment_id: { type: Schema.Types.ObjectId, ref: "paymentmethods", required: true },
    order_note:{ type: String},
    shipping_cost: { type: Number, required: true },
    voucher_id: { type: Schema.Types.ObjectId, ref: "vouchers" },
    loca_id: { type: Schema.Types.ObjectId, ref: "locations", required: true },
    list_items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: "products", required: true }, 
            variant_id: { type: Schema.Types.ObjectId, required: false }, 
            prod_name: { type: String, required: true }, 
            prod_discount:{ type: String, required: true }, 
            image:{ type: String, required: true }, 
            variant_name: { type: String, required: false },
            price: { type: Number, required: true }, 
            quantity: { type: Number, required: true }, 
        }
    ],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("orders", OrdersSchema);

