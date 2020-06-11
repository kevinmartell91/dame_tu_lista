var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var cartSchema = new Schema({

    status: String,
    quantity: Number,
    totalPrice: Number,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products"
    }]

});

var Cart = mongoose.model('cart', cartSchema);
module.export = Cart;