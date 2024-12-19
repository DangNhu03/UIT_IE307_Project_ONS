const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LocationsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    loca_address: { type: String, default:null },
    loca_address_province:{type:String, require:true},
    loca_address_district:{type:String, require:true},
    loca_address_commue:{type:String, require:true},
    loca_address_detail:{type:String, default:null},
    loca_phone: { type: String, require: true },
    loca_per_name: { type: String, require: true },
    is_default: {type: Boolean, default:false}
});

module.exports = mongoose.model("locations", LocationsSchema);
