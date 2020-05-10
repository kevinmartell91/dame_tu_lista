const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV; // development
const stage = require('../config/config')[environment];


var Schema = mongoose.Schema;

var medicalCenterSchema = new Schema({

	name: String,
	tax_identification: String,
	email: String,
	country: String,
	role: String,
	// Will be send by email
	username: String,
  	password: String,

  	// will be requested later in update Info
    // address: {
  	 //  street: String,
  	 //  city: String,
  	 //  state: String,
  	 //  zip: Number,
  	 //  country: String
	// }

});

// on every save, add the date
medicalCenterSchema.pre('save', function(next){
  const medicalCenter = this;
  this.medicalCenter.role = 'medical_center';
  // Do not rehash if it;s an old user
  if(!medicalCenter.isModified || !medicalCenter.isNew) { 
	  next();
  } else {
	  bcrypt.hash(medicalCenter.password, stage.saltingRounds, function(err, hash) {
		if(err) {
			console.log('Error hashing pasword for medical center', stage.saltinRounds);
			next();
		} else {
			console.log("HASHED");
			medicalCenter.password = hash;
			next();
		}
	  });
  }
});

var MedicalCenter = mongoose.model('MedicalCenter',medicalCenterSchema);

module.exports = MedicalCenter;