const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let VouchersSchema = new Schema({
    vouc_code: { type: String, required: true },
    vouc_discount_type: { type: String, required: true },
    vouc_discount_value: { type: Number, required: true },
    vouc_min_order_value: { type: Number, required: true },
    vouc_start_date: { type: Date, required: true },
    vouc_end_date: { type: Date, required: true },
    vouc_max_uses: { type: Number, required: true },
    vouc_is_active:{type: Boolean, default: true}
});

module.exports = mongoose.model("vouchers", VouchersSchema);
