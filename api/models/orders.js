const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
price: {type: Number, required: true},
name: {type: String, required: true}


});
module.exports = mongoose.model('product', productSchema);