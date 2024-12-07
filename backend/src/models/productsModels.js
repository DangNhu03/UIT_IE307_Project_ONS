const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductsSchema = new Schema({
  cate_id: { type: Schema.Types.ObjectId, ref: "categories", required: true },
  prod_name: { type: String, required: true },
  prod_price: { type: Number, required: true },
  date_start_sale: { type: Date },
  date_end_sale: { type: Date },
  prod_discount: { type: Number, default: 0 },
  prod_stock: { type: Number, required: true },
  prod_sold: { type: Number, required: true, default: 10 },
  prod_avg_rating: { type: Number, required: true, default: 0 },
  prod_review_count: { type: Number, required: true, default: 0 },
  prod_image: { type: [String], required: true },
  prod_description: { type: String, required: true },
  prod_characteristics: { type: [String], required: true },
  prod_variations: [{
    _id: { type: Schema.Types.ObjectId, auto: true }, 
    variant_name: { type: String, required: true }, 
    variant_price: { type: Number, required: true }, 
    variant_stock_quantity: { type: Number, default: 10 }, 
    variant_image: { type: String }, 
  }],
});

module.exports = mongoose.model("products", ProductsSchema);
