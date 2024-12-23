const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CategoriesSchema = new Schema({
    cate_name: { type: String, required: true },
    cate_img: { type: String, required: true},
});

module.exports = mongoose.model("categories", CategoriesSchema);
