const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    settings: {
    address: String,
    city: String,
    state: String,
    },
    email: String,
    password: String
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
