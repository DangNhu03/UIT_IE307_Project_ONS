const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ReviewsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  revi_rating: { type: Number, required: true },
  revi_content: { type: String, required: true },
  revi_img: { type: [String], require: false },
  quantityLike: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  prod_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
  variant_id: { type: Schema.Types.ObjectId, required: false },
});

module.exports = mongoose.model("reviews", ReviewsSchema);
