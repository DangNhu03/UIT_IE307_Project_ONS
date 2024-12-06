const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    noti_title: { type: String, required: true },
    noti_content: { type: String, required: true },
    noti_image: { type: String, required: true },
    noti_type:{type: String, require:true},
    noti_time: { type: Date, require: true },
   
});

module.exports = mongoose.model("notification", NotificationSchema);
