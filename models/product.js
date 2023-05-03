const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
price: [Number, required],
name: [String, required]


});
module.exports = mongoose.model('product', productSchema);