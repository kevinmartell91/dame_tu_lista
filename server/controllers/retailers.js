
// Load required packages
var Retailer = require('../models/retailers');

// Create endpoint /api/retailers for POST
exports.postMedicalCenters = function(req, res) {
  // Create a new instance of the Retailer model

  var retailer = new Retailer();

  //Set the retailer properties that came from the POST data
  retailer.name = req.body.name;
  retailer.tax_identification = req.body.tax_identification;
  retailer.email = req.body.email;
  retailer.country = req.body.country;

  retailer.username = req.body.username;
  retailer.password = req.body.password;

  // Save the retailer and check for errors
  retailer.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Retailer added', data: retailer });
  });
};

// Create endpoint /api/retailers for GET
exports.getMedicalCenters = function(req, res) {

  Retailer.find(function(err, retailers) {
    if (err)
      return res.send(err);

    res.json(retailers);
  });
};

// Create endpoint /api/retailers/:medical_center_id for GET
exports.getMedicalCenter = function(req, res) {

  Retailer.findById(req.params.medical_center_id, function(err, retailer) {
  
    if (err)
      return res.send(err);

    res.json(retailer);
  });
};

// Create endpoint /api/retailers/:medical_center_id for PUT
exports.putMedicalCenter = function(req, res) {

  Retailer.findById(req.params.medical_center_id, function(err, retailer) {
    if (err)
      return res.send(err);

    retailer.name = req.body.name;
    retailer.tax_identification = req.body.tax_identification;
    retailer.email = req.body.email;
    retailer.country = req.body.country;
    retailer.password = req.body.password;
    retailer.username = req.body.username;

    retailer.save(function(err){
      if(err) 
        return res.send(err);

      res.json({ message: 'Retailer updated' });

    });
  });
};

// Create endpoint /api/retailers/:beer_id for DELETE
exports.deleteMedicalCenter = function(req, res) {

  Retailer.findByIdAndRemove(req.params.medical_center_id, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Retailer removed' });

  });
};
