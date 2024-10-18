const mongoose = require("mongoose");

let Schema = mongoose.Schema;


let DeliveryMethodsSchema = Schema({
    deli_name: { type: String, required: true }, 
    deli_cost: { type: Number }, 
});

module.exports = mongoose.model("deliverymethods", DeliveryMethodsSchema);

