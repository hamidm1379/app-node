const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userAdmin = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

userAdmin.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
userAdmin.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model("UserAdmin", userAdmin)