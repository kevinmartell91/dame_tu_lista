var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV; // development
const stage = require('../CONFIG')[environment];

var retailerSchema = new Schema({
  // Will be send by email TO THE ATTORNEY
  username: String,
  password: String,
  name: { type: String, lowercase: true, trim: true },
  lastname: { type: String, lowercase: true, trim: true },
  email: { type: String, unique: true, lowercase: true },
  phoneNumber: String,
  store: {
    name: String,
    imgUrl: String,
    isDeliveryService: Boolean,
    isPickUpService: Boolean,
    deliveryInfo: String,
    pickUpInfo: String,
    address: {
      streetName: String,
      streetnumber: String,
      district: String,
      city: String,
      department: String,
      country: String,
      reference: String,
      details: String   
    },
    productsList: [{
      categoryImageUrl: String,
      categoryName: String,
      varietyImageUrl: String,
      varietyName: String,
      currency: String,
      price: String,
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
    }]
  },
  singUpDate: {type: Date, default: Date.now() },
  lastLoginDate: Date,
  user_type: { type: String, default: "retailer" },

  total_sells: { type: Number, default: 0 },
  total_orders: { type: Number, default: 0 },

});

// productsList: [{
//   type: Schema.Types.ObjectId,
//   ref: "Products"
// }]

// on every save, add the date
retailerSchema.pre('save', function(next) {
  let retailer = this;

  // Do not rehash if it's an old retailer
  if(!retailer.isModified('password')) return next(err);

  bcrypt.hash(retailer.password, stage.saltingRounds, function(err, hash) {
    if(err) {
      console.log("Error hashing password for Retailer");
      return next(err);
    } else {
      console.log ("Retailer password hashed", hash);
      retailer.password = hash;
      next();
    }
  });
});

var Retailer = mongoose.model('Retailer',retailerSchema);

module.exports = Retailer;




