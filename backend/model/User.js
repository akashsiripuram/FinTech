const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullName: { type: String }, 
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    this.fullName = `${this.firstname} ${this.lastname}`;
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
