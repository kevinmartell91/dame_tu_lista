var app = require('express')();
// used to create, sign, and verify tokens
var jwt    = require('jsonwebtoken'); 
var configJWT = require('../config/jwt');
// var jwt_helper = require('../routes/simple_jwt');
const bcrypt = require('bcrypt');
const genAccessToken2 = require('../routes/simple_jwt').genAccessToken;
const getEntityType = require('../utils').getEntityType;




// secret variable
app.set('superSecret', configJWT.secret); 

// var User = require('../models/users');
// var Pacient = require('../models/pacients');
// var Therapist = require('../models/therapists');
// var MedicalCenter = require('../models/medicalCenters');

exports.postAuthenticate = function(req, res) {

  const { username, password, login_type } = req.body;

  
  const entityType = getEntityType(login_type);

  if(!entityType) {
    res.json( {success: false, message: 'Authentication fail. Entity not found.'})
  }
  console.log("email", username);
  console.log("password", password);

  entityType.findOne({
    email: username
  }, function(err, entity) {
    if (err) {
      console.log("ERROR = >",err);
      throw err;
    }
    
    if (!entity) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (entity) {
      console.log(" entity", entity);
      // check if passwords matche
      bcrypt.compare(password, entity.password).then(math => {
        if (math) {
          console.log(`Match this ${password} con este ${entity.password}`);
          // genreate a token
          const token = genAccessToken2(entity.toJSON());
          console.log(" token", token);
          res.json({
            username: "kevin",
            password: "******",
            success: true,
            message: 'Enjoy your token!',
            token: token,
            entity: entity
          });
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }  
      })
      .catch( err => console.log(err));
    }
  });


};

