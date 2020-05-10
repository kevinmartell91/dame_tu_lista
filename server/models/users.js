// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV; // development
const stage = require('../config/config')[environment];


// create a schema
var userSchema = new Schema({
  username: String,
  password: String,
  type: String,
  quantity: Number,
  userId: String,
  created_at : Date,
  role: String
  
});

// on every save, add the date
userSchema.pre('save', function(next) {
  let user = this;
  user.role = 'user';
  var hash ;
  // Do not rehash if it;s an old user
  if(!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
      if(err) {
        console.log("Error hashing password for User");
        next();
      } else {
        this.hash = hash;
        console.log ("User password hashed", hash);
        user.password = hash;
        next();
      }
    })
  }
  this.password = this.hash;

  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;