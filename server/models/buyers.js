// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV; // development
const stage = require('../CONFIG')[environment];


// create a schema
var buyerSchema = new Schema({
  username: String,
  password: String,
  name: { type: String, lowercase: true, trim: true },
  lastname: { type: String, lowercase: true, trim: true },
  email: { type: String, unique: true, lowercase: true },
  address: {
    streetName: String,
    streetNumber: String,
    district: String,
    city: String,
    department: String,
    country: String,
    reference: String,
    details: String   
  }, 
  phoneNumber: String,
  myFavoriteRetailers: [{
    _id: String,
    storeName: String,
    isDeliveryService: Boolean,
    isPickUpService: Boolean,
    storeImgUrl: String,
    email: String,
    phoneNumber: String    
  }],
 
// what else  

  singUpDate: {type: Date, default: Date.now() },
  lastLoginDate: Date,
  user_type: { type: String, default: "buyer" }, 
  total_spent: { type: Number, default: 0 },
  total_orders: { type: Number, default: 0 },
  last_order: Date,
  
});

// before every save, add the date
buyerSchema.pre('save', function(next) {
  var buyer = this;

  // Do not rehash if it's an old buyer
  if(!buyer.isModified('password')) return next();

  bcrypt.hash(buyer.password, stage.saltingRounds, function(err, hash) {
    if(err) {
      // console.log("Error hashing password for Buyer");
      return next(err);
    }
    buyer.password = hash;
    // console.log ("Buyer password hashed", buyer.password);
    next();
  });
});

var Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;