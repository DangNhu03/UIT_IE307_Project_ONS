const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ReviewsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    prod_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
    revi_rating: { type: Number, required: true },
    revi_content: { type: String, required: true },
});

module.exports = mongoose.model("reviews", ReviewsSchema);
