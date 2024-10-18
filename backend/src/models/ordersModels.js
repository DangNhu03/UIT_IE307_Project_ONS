const mongoose = require("mongoose");

let Schema = mongoose.Schema;


let OrdersSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    order_status: { type: String, required: true },
    order_total_price: { type: Number, required: true },
    order_final_price: { type: Number, required: true },
    order_delivery_id: { type: Schema.Types.ObjectId, ref: "deliverymethods", required: true },
    order_payment_id: { type: Schema.Types.ObjectId, ref: "paymentmethods", required: true },
    voucher_id: { type: Schema.Types.ObjectId, ref: "vouchers" },
    list_items: [
        {
            variations_id: { type: Schema.Types.ObjectId, ref: "productvariations", required: true },
            name:{ type: String, require: true},
            quantity: { type: Number,default: 1 },
            price: { type: Number, require: true},
        }
    ]
});

module.exports = mongoose.model("orders", OrdersSchema);

