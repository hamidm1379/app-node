const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newCate = Schema({
    cate: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model("Cate", newCate)