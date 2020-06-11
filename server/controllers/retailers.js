
// Load required packages
var Retailer = require('../models/retailers');
var Product = require('../models/products');

// Create endpoint /api/retailers for POST
exports.postRetailers = function(req, res) {
  // Create a new instance of the Retailer model
  var retailer = new Retailer();

  retailer.username = req.body.username;
  retailer.password = req.body.password;
  retailer.name = req.body.name;
  retailer.lastname = req.body.lastname;
  retailer.email = req.body.email;
  retailer.phoneNumber = req.body.phoneNumber;
  
  retailer.save(function(err) {
    if (err){

      console.log(err);
      return res.status(500).send(err);
    }

    res.json({ 
			success: true,
			status: 200,
			message: 'retailer added', 
			data: retailer
		});
  });
};

// Create endpoint /api/retailers for GET
exports.getRetailers = function(req, res) {

  Retailer.find(function(err, retailers) {
    if (err)
      return res.send(err);

    res.json({ 
			success: true,
			status: 200,
			message: 'retailer list', 
			data: retailers
		});
  });
};

// Create endpoint /api/retailers/:reatiler_id for GET
exports.getRetailer = function(req, res) {

  Retailer.findById(req.params.retailer_id, function(err, retailer) {
  
    if (err)
      return res.send(err);

    res.json({ 
      success: true,
      status: 200,
      message: 'retailer retrived', 
      data: retailer
    });
  });
};

// Create endpoint /api/retailers/:reatiler_id for PUT
exports.putRetailer = function(req, res) {

  Retailer.findById(req.params.retailer_id, function(err, retailer) {
    if (err)
      return res.send(err);

    retailer.username = req.body.username;
    retailer.password = req.body.password;
    retailer.name = req.body.name;
    retailer.lastname = req.body.lastname;
    // retailer.email = req.body.email;
    retailer.phoneNumber = req.body.phoneNumber;
    retailer.store = {
      name: req.body.store.name,
      imgUrl: req.body.store.imgUrl,
      isDeliveryService: req.body.store.isDeliveryService,
      isPickUpService: req.body.store.isPickUpService,
      deliveryInfo: req.body.store.deliveryInfo,
      pickUpInfo: req.body.store.pickUpInfo,
      address: {
        streetName: req.body.store.address.streetName,
        streetnumber: req.body.store.address.streetnumber,
        district: req.body.store.address.district,
        city: req.body.store.address.city,
        department: req.body.store.address.department,
        country: req.body.store.address.country,
        reference: req.body.store.address.reference,
        details: req.body.store.address.details
      }
    };

    retailer.save(function(err){
      if(err) 
        return res.send(err);

      res.json({ 
        success: true,
        status: 200,
        message: 'retailer updated', 
        data: retailer
      });
    });
  });
};

// Create endpoint /api/retailers/:retailer_id for DELETE
exports.deleteRetailer = function(req, res) {

  Retailer.findByIdAndRemove(req.params.retailer_id, function(err) {
    if (err)
      return res.send(err);

      res.json({ 
        success: true,
        status: 200,
        message: 'retailer deleted', 
      });
  });
};

exports.putRetailerStore = function(req, res) {
  
  Retailer.findById(req.params.retailer_id, function(err, retailer) {
    if (err)
      return res.send(err);

    retailer.store = {
      name: req.body.store.name,
      imgUrl: req.body.store.imgUrl,
      isDeliveryService: req.body.store.isDeliveryService,
      isPickUpService: req.body.store.isPickUpService,
      deliveryInfo: req.body.store.deliveryInfo,
      pickUpInfo: req.body.store.pickUpInfo,
      address: {
        streetName: req.body.store.address.streetName,
        streetnumber: req.body.store.address.streetnumber,
        district: req.body.store.address.district,
        city: req.body.store.address.city,
        department: req.body.store.address.department,
        country: req.body.store.address.country,
        reference: req.body.store.address.reference,
        details: req.body.store.address.details
      }
    };
    
    retailer.save(function(err){
      if(err)
        return res.status(500).send(err);

      res.json({
        success: true,
        status: 200,
        message: "retailer's address updated",
        data: retailer
      });  
    });
  });
};

exports.postRetailerProductList = function(req, res) {
  
  Retailer.findById(req.params.retailer_id, function(err, retailer) {

    if(err) 
      return res.status(500).send(err);
    
    let productsList = req.body.productsList;  

    for(var i = 0; i < productsList.length; i++ ){
      retailer.store.productsList.push(productsList[i]);
    }  
    retailer.save(function(err){
      if(err)
        return res.status(500).send(err);

      res.json({
        success: true,
        status: 200,
        message: "retailer's product list added",
        data: retailer
      });  
    });
  });
};

exports.putRetailerProductList = function(req, res) {
  
  Retailer.findById(req.params.retailer_id, function(err, retailer) {
    
    if(err) 
      return res.status(500).send(err);
    
    // https://stackoverflow.com/questions/3507624/mongodb-nosql-keeping-document-change-history?noredirect=1&lq=1
    // https://www.infoq.com/articles/data-model-mongodb/
    // https://www.wpclipart.com/phps.php?q=orange&submit=Search
    
    const updatedProductsList = req.body.productsList;
    const db_productsList = retailer.store.productsList;
    
    for( let i = 0; i < updatedProductsList.length; i++ ) {
      // get one product by id and match it in DB by id
      const updatedProduct = updatedProductsList[i];
      
      for (let j = 0 ; j < db_productsList.length ; j++ ) {
        if(updatedProduct._id == db_productsList[j]._id) {

          // categoryImageUrl
          // categoryName
          // varietyImageUrl
          // varietyName
          // currency
          db_productsList[j].price = updatedProduct.price;
          db_productsList[j].isSmallSize = updatedProduct.isSmallSize;
          db_productsList[j].isMediumSize = updatedProduct.isMediumSize;
          db_productsList[j].isBigSize = updatedProduct.isBigSize;
          db_productsList[j].isKilo = updatedProduct.isKilo;
          db_productsList[j].isUnit = updatedProduct.isUnit;
          db_productsList[j].isOrganic = updatedProduct.isOrganic;
          db_productsList[j].isSeasonal = updatedProduct.isSeasonal;
          db_productsList[j].isMaturityDetails = updatedProduct.isMaturityDetails;
          db_productsList[j].maturityImageUrl = updatedProduct.maturityImageUrl;
          db_productsList[j].maturityName = updatedProduct.maturityName;
          db_productsList[j].maturityInfo = updatedProduct.maturityInfo;
          db_productsList[j].maturityEatIn = updatedProduct.maturityEatIn;
          db_productsList[j].maturityLastFor = updatedProduct.maturityLastFor;
          db_productsList[j].isInStock = updatedProduct.isInStock;

          retailer.store.productsList[j] = db_productsList[j];
        }
      }
    }  
    
    retailer.save(function(err){
      if(err)
        return res.status(500).send(err);

      res.json({
        success: true,
        status: 200,
        message: "retailer's product list updated",
        data: retailer
      });  
    });
  });
};