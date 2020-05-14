var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var retailerSchema = new Schema({
  // Will be send by email TO THE ATTORNEY
  username: String,
  password: String,     
  names: String,
  lastname: String,
  gender: String,
  id_document_type: String,
  id_document_num: Number,
  birth:  String,

  created_at: { type: Date, default: Date.now },
  updated_at: String,
  is_active: Boolean, 

  address: {
  	street: String,
  	city: String,
  	state: String,
  	zip: Number,
  	country: String
  },

//   medic_diagostic: [{
//     name: String,
//     level: String,
//     percentage: String,
//     created_at: { type: Date, default: Date.now }
//   }],

//   attorney: {
//   	names: String,
//   	lastname: String,
//   	relationship : String,
//   	email: String,
//   	phone: String,
//   	cellphone: String
//    },





//   medicalCenters : {
//     _id: String,
//     name: String,
//     status_request: String, // pending(0 day to more), accepted 
//     requested_at: { type: Date, default: Date.now },
//     accepted_at: Date
//   }


});

// UserSchema.pre('save', function (next) {
//   email(this.email, 'Your record has changed');
//   next();
// });

// on every save, add the date
retailerSchema.pre('save', function(next) {
    let retailer = this;
    retailer.role = 'retailer';
    var hash ;
    // Do not rehash if it's an old retailer
    if(!retailer.isModified || !retailer.isNew) {
      next();
    } else {
      bcrypt.hash(retailer.password, stage.saltingRounds, function(err, hash) {
        if(err) {
          console.log("Error hashing password for Retailer");
          next();
        } else {
          this.hash = hash;
          console.log ("Retailer password hashed", hash);
          retailer.password = hash;
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

var Retailer = mongoose.model('Retailer',retailerSchema);

module.exports = Retailer;




