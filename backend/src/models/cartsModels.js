const mongoose = require("mongoose");

let Schema = mongoose.Schema;


let CartsSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    list_products: [
        {
            variations_id: { type: Schema.Types.ObjectId, ref: "productvariations", required: true },
            name:{ type: String, required: true },
            quantity: { type: Number, default: 1 },
        }
    ]
});

module.exports = mongoose.model("carts", CartsSchema);

