const mongoose = require("mongoose");

let Schema = mongoose.Schema;


let PaymentMethodsSchema = Schema({
    pay_name: { type: String, required: true }, 
});

module.exports = mongoose.model("paymentmethods", PaymentMethodsSchema);

