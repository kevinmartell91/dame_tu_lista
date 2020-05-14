// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV; // development
const stage = require('../config/config')[environment];


// create a schema
var buyerSchema = new Schema({
  username: String,
  password: String,
  type: String, 

//   total_spent: Number,
//   total_orders: Number,
//   last_order_is: String,

  quantity: Number,
//   userId: String,
  created_at : Date,
  role: String
  
});

// on every save, add the date
buyerSchema.pre('save', function(next) {
  let buyer = this;
  buyer.role = 'buyer';
  buyer.quantity = 0
  
  var hash ;
  // Do not rehash if it's an old buyer
  if(!buyer.isModified || !buyer.isNew) {
    next();
  } else {
    bcrypt.hash(buyer.password, stage.saltingRounds, function(err, hash) {
      if(err) {
        console.log("Error hashing password for Buyer");
        next();
      } else {
        this.hash = hash;
        console.log ("Buyer password hashed", hash);
        buyer.password = hash;
        next();
      }
    })
  }
  this.password = this.hash;

  // get the current date
//   var currentDate = new Date();
  // change the updated_at field to current date
//   this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Buyer = mongoose.model('Buyer', buyerSchema);

// make this available to our buyers in our Node applications
module.exports = Buyer;