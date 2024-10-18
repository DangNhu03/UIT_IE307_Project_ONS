const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductVariationsSchema = new Schema({
  prod_id: { type: Schema.Types.ObjectId, ref: "products", required: true },
  prod_price: { type: Number, required: true },
  prod_stock_quantity: { type: Number, default: 100 },
  prod_image: { type: String },
  prod_variations: {
    color: { type: String, default: "" },
    size: { type: String, default: "" }, 
    type: { type: String, default: "" },
  },
});

module.exports = mongoose.model("productvariations", ProductVariationsSchema);
