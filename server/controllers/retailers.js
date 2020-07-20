
// Load required packages
var Retailer = require('../models/retailers');
var Product = require('../models/products');
var airTable = require('./airtable');

// Create endpoint /api/retailers for POST
exports.postRetailers = async function(req, res, next) {

  let buyerData = req.body;
  // Create a new instance of the Retailer model
  const retailerData =  new Retailer(buyerData);

  retailerData.save( function(err) {

    if (err) {
			return  res.json({ 
					success: false,
					status: 500,
					message: 'retailer not added', 
					data: err
				}
			);
		}

		res.json({ 
			success: true,
			status: 200,
			message: 'retailer added', 
			data: retailerData
		});
  })

};

// Create endpoint /api/retailers for GET
exports.getRetailers = async function(req, res, next) {

  const retailerData = await Retailer.find();

  if(retailerData) {
  
    res.json({ 
      success: true,
      status: 200,
      message: 'retailer added', 
      data: retailerData
    });
    
  } else {
    res.json({ 
      success: false,
      status: 500,
      message: 'retailer not added', 
      data: retailerData
    });
  }
};

// Create endpoint /api/retailers/:reatiler_id for GET
exports.getRetailer = async function(req, res, next) {

  let id = req.params.retailer_id;
  const retailerData = await Retailer.findById(id);
  
  if(retailerData) {
  
    res.json({ 
      success: true,
      status: 200,
      message: 'retailer retrieved', 
      data: retailerData
    });
    
  } else {
    res.json({ 
      success: false,
      status: 500,
      message: 'retailer not retrieved', 
      data: retailerData
    });
  }
};

// Create endpoint /api/retailers/:retailer_id for PUT
exports.putRetailer = async function(req, res) {

  let id = req.params.retailer_id;
  let retailerData = req.body;
  const retailerUpdated = 
    await  Retailer.findByIdAndUpdate(id, retailerData, {new :true});
  
  if(retailerUpdated){
    res.json({ 
      success: true,
      status: 200,
      message: 'retailer updated', 
      data: retailerUpdated
    });
  } else {
    res.json({ 
      success: false,
      status: 500,
      message: 'retailer not updated', 
      data: retailerUpdated
    });
  }


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

//ok
// Create endpoint /api/retailer-store/:retailer_id 
exports.putRetailerStore = function(req, res) {

  let id = req.params.retailer_id;

  Retailer.findById(id, function(err, retailer) {
    if (err)
      return res.status(500).send(err);

    // to do = > add UI to get this attribute
    retailer.phoneNumber = req.body.phoneNumber;

    retailer.store.name = req.body.store.name;
    retailer.store.imgUrl = req.body.store.imgUrl;
    retailer.store.isDeliveryService = req.body.store.isDeliveryService;
    retailer.store.isPickUpService = req.body.store.isPickUpService;
    retailer.store.deliveryInfo = req.body.store.deliveryInfo;
    retailer.store.pickUpInfo = req.body.store.pickUpInfo;
    retailer.store.productsList = retailer.store.productsList;
 
    retailer.store.address.streetName = req.body.store.address.streetName;
    retailer.store.address.streetNumber = req.body.store.address.streetNumber;
    retailer.store.address.district = req.body.store.address.district;
    retailer.store.address.city = req.body.store.address.city;
    retailer.store.address.department = req.body.store.address.department;
    retailer.store.address.country = req.body.store.address.country;
    retailer.store.address.reference = req.body.store.address.reference;
    retailer.store.address.details = req.body.store.address.details;

    retailer.save(function(err) {

      if (err) 
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
  
  let id = req.params.retailer_id;
  let productsList = req.body.productsList;  

  Retailer.findById(id, function(err, retailer) {

    if(err) 
      return res.status(500).send(err);
    
    retailer.store.productsList= [];

    for(var i = 0; i < productsList.length; i++ ){
      retailer.store.productsList.push(productsList[i]);
    }  
    
    // let prodcutListUpdated = { productsList : retailer.store.productsList};
    // Retailer.findByIdAndUpdate(id, prodcutListUpdated, {new: true},function(err){
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
  
  let id = req.params.retailer_id;
  Retailer.findById(id, function(err, retailer) {
    
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
          // db_productsList[j].price = updatedProduct.price;
          // db_productsList[j].isSmallSize = updatedProduct.isSmallSize;
          // db_productsList[j].isMediumSize = updatedProduct.isMediumSize;
          // db_productsList[j].isBigSize = updatedProduct.isBigSize;
          // db_productsList[j].isKilo = updatedProduct.isKilo;
          // db_productsList[j].isUnit = updatedProduct.isUnit;
          // db_productsList[j].isOrganic = updatedProduct.isOrganic;
          // db_productsList[j].isSeasonal = updatedProduct.isSeasonal;
          // db_productsList[j].isMaturityDetails = updatedProduct.isMaturityDetails;
          // db_productsList[j].maturityImageUrl = updatedProduct.maturityImageUrl;
          // db_productsList[j].maturityName = updatedProduct.maturityName;
          // db_productsList[j].maturityInfo = updatedProduct.maturityInfo;
          // db_productsList[j].maturityEatIn = updatedProduct.maturityEatIn;
          // db_productsList[j].maturityLastFor = updatedProduct.maturityLastFor;
          // db_productsList[j].isInStock = updatedProduct.isInStock;

          // retailer.store.productsList[j] = db_productsList[j];
          retailer.store.productsList[j] = updatedProduct;
        }
      }
    }  

    // let prodcutListUpdated = { productsList : retailer.store.productsList};
    // Retailer.findByIdAndUpdate(id, prodcutListUpdated, {new: true},function(err,retailer ){
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

exports.dltAirtableToMongo = async function(req, res, next) {

  let r = airTable.getAirtableRecords();
  return (r);
}