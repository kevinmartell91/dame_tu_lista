// used to create, sign, and verify tokens
// sample =>https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
const jwt    = require('jsonwebtoken');
const crypto = require ('crypto'); 
const configJWT = require('./config/jwt');
// const getUserDB = require('../controllers/user').getUserBD;

const Buyer = require('./models/buyers');
const Retailer = require('./models/retailers');


const JWT_SECRET_KEY = 'ilovescotchyscotch';

const hashHmacSha256 = string => crypto
  .createHmac('sha256', JWT_SECRET_KEY)
  .update(string)
  .digest('hex');

function genKey (id, password) {
  const rawKey = id + password;
  const key = hashHmacSha256(rawKey, JWT_SECRET_KEY);
  return key;
};

module.exports = {

  getEntityType(login_type) {
    
    let entity_type;
    // console.log("KEVIN =>login_type => ", login_type);
    switch (login_type){
      case 'buyer':           entity_type = (Buyer); break;
      case 'retailer':        entity_type = (Retailer); break;
    }
    return entity_type;
  },

  getUserIdByLoginType(login_type, entity_id ){
    const entity_type =  module.exports.getEntityType(login_type);
    // console.log("entity_type = > ",entity_type);
    return new Promise( function(resolve, reject) {
      entity_type.findById(entity_id, function (err, entity_data){
        if(err) {  
          // console.log(err);
          reject(error);
        }
        resolve(entity_data);
      });
    })
    .then(() => { })
    // .catch("ERROR ERROR")
  },

};