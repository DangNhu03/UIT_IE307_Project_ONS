const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserVoucherSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    voucher_id: { type: mongoose.Schema.Types.ObjectId, ref: "vouchers", required: true },
    is_used:{type:Boolean, default: 1}
});

module.exports = mongoose.model("uservoucher", UserVoucherSchema);
