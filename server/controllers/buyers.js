
// Load required packages
var Buyer = require('../models/buyers');

// Create endpoint /api/buyers for POST
exports.postBuyers = function(req, res) {
  // Create a new instance of the Buyer model

  var buyer = new Buyer();
  console.log(req.body);
  //Set the buyer properties that came from the POST data
  buyer.type = req.body.type;
  buyer.quantity = req.body.quantity;
  buyer.userId = req.body.userId;
  buyer.username = req.body.username;
  buyer.password = req.body.password;

  // Save the buyer and check for errors
  buyer.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Buyer added', data: buyer });
  });
};

// Create endpoint /api/buyers for GET
exports.getBuyers = function(req, res) {

  Buyer.find(function(err, buyers) {
    if (err)
      return res.send(err);

    res.json(buyers);
  });
};

// Create endpoint /api/buyers/:user_id for GET
exports.getBuyer = function(req, res) {

  Buyer.findById(req.params.user_id, function(err, buyer) {
  
    if (err)
      return res.send(err);

    res.json(buyer);
  });
};

exports.getBuyer_JWTVerification = function(user_id) {
  return new Promise(function(resolve, reject) {
    Buyer.findById(user_id, function(err, buyer) {
      if (err)
        reject(err);
      
      resolve(buyer);
    });
  });
};

// Create endpoint /api/buyers/:user_id for PUT
exports.putBuyer = function(req, res) {

  Buyer.findById(req.params.user_id, function(err, buyer) {
    if (err)
      return res.send(err);

    buyer.quantity = req.body.quantity;

    buyer.save(function(err){
      if(err) 
        return res.send(err);

      res.json({ message: 'Buyer updated' });

    });
  });
};

// Create endpoint /api/buyers/:beer_id for DELETE
exports.deleteBuyer = function(req, res) {

  Buyer.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Buyer removed' });

  });
};

