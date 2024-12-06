const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsersSchema = new Schema({
    user_name: { type: String, required: true },
    user_phone: { type: String, required: true },
    user_email: { type: String },
    user_pass: { type: String, require: true },
    local_default_id: { type: Schema.Types.ObjectId, ref: "locations" },
    list_vouchers: [
        {
            voucher_id: { type: Schema.Types.ObjectId, ref: "vouchers" },
            is_used: { type: Boolean, default: false }
        }
    ]
});

module.exports = mongoose.model("users", UsersSchema);
