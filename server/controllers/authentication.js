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

  entityType.findOne({
    username: username
  }, function(err, entity) {
    if (err) throw err;

    if (!entity) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (entity) {
      // check if password matches
      bcrypt.compare(password, entity.password).then(math => {
        console.log(`Match this ${password} con este ${entity.password}`);
        if (math) {
          // genreate a token
          const token = genAccessToken2(entity.toJSON());
          res.json({
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

