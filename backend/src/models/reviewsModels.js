const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ReviewsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    prod_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
    prod_variant_name: { type: String, required: false },
    revi_rating: { type: Number, required: true },
    revi_content: { type: String, required: true },
    revi_img:{type:[String], require:false},
    created_at: { type: Date, default: Date.now }, // Ngày tạo mặc định là ngày hiện tại
});

module.exports = mongoose.model("reviews", ReviewsSchema);
