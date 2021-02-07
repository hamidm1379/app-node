const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newProduct = new Schema({
    name: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("products", newProduct)