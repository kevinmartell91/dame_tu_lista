var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var productShema = new Schema({
    _id: String,
    categoryImageUrl: String,
    categoryName: String,
    varietyImageUrl: String,
    varietyName: String,
    currency: String,
    price: Number,
    isSmallSize: Boolean,
    isMediumSize: Boolean,
    isBigSize: Boolean,
    isKilo: Boolean,
    isUnit: Boolean,
    isOrganic: Boolean,
    isSeasonal: Boolean,
    isMaturityDetails: Boolean,
    maturityImageUrl: String,
    maturityName: String,
    maturityInfo: String,
    maturityEatIn: String,
    maturityLastFor: String, 
    isInStock: Boolean   
});

var Products = mongoose.model('Products',productShema);

module.exports = Products;