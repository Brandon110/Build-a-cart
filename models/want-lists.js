const mongoose = require('mongoose');
const Schema = mongoose.Schema

const wantListSchema = new Schema({
    email: String,
    budget: Number,
    items: [{
    name: String,
    image: String,
    price: Number,
    description: String,
   }]
});

const wantListModel = mongoose.model('want-list', wantListSchema);
module.exports = wantListModel;
