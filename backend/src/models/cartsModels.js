const mongoose = require("mongoose");

let Schema = mongoose.Schema;


let CartsSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    list_products: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: "products", required: true }, 
            variant_id: { type: Schema.Types.ObjectId, required: false }, 
            prod_name: { type: String, required: true }, 
            prod_discount:{ type: String, required: true }, 
            image:{ type: String, required: true }, 
            stock:{ type: String, required: true }, 
            variant_name: { type: String, required: false },
            price: { type: Number, required: true }, 
            quantity: { type: Number, default: 1 }, 
        }
    ]
});

module.exports = mongoose.model("carts", CartsSchema);

