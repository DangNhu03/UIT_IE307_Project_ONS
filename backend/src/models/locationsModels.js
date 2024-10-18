const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LocationsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    loca_address: { type: String, required: true },
    loca_phone: { type: String, require: true },
    loca_per_name: { type: String, require: true },
});

module.exports = mongoose.model("locations", LocationsSchema);
