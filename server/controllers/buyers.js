
// Load required packages
var Buyer = require('../models/buyers');
const Retailer = require('../models/retailers');

// creating endpoint /api/buyers POST
exports.postBuyers = function(req, res) {
	// creating a new instance of the Buyers model
	var buyer = new Buyer();

	// setting buyer properties that come from POST
	buyer.username = req.body.username; 
	buyer.password = req.body.password; 
	buyer.name = req.body.name; 
	buyer.lastname = req.body.lastname; 
	buyer.email = req.body.email; 
	buyer.phoneNumber = req.body.phoneNumber; 

	// buyer.lastLoginDate = req.body.lastLoginDate; 
	// buyer.last_order = req.body.last_order; 

	// var len = req.body.myFavoriteRetailers.length;
	// for (var i=0 ; i<len ; i++) {
	// 	buyer.myFavoriteRetailers.push(req.body.myFavoriteRetailers[i]);
	// }
	
	buyer.save(function(err){
		if (err)
			return res.status(500).send(err);

		res.json({ 
			success: true,
			status: 200,
			message: 'buyer added', 
			data: buyer
		});
	});
};

// Create endpoint /api/buyers for GET
exports.getBuyers = async function(req, res, next) {

  const buyers = await Buyer.find();
  res.json({ 
		success: true,
		status: 200,
		message: 'buyers list', 
		data: buyers
	});
};
// // Create endpoint /api/buyers for GET
// exports.getBuyers = function(req, res) {

//   Buyer.find(function(err, buyers) {
//     if (err)
//       return res.status(500).send(err);

// 		res.json({ 
// 			success: true,
// 			status: 200,
// 			message: 'buyers list', 
// 			data: buyers
// 		});
//   });
// };

// Create endpoint /api/buyers/:user_id for GET
exports.getBuyer = function(req, res) {

  Buyer.findById(req.params.buyer_id, function(err, buyer) {
  
    if (err)
      return res.status(500).send(err);

	res.json({ 
		success: true,
		status: 200,
		message: 'buyers list', 
		data: buyer
	});
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

  Buyer.findById(req.params.buyer_id, function(err, buyer) {
    if (err)
      return res.status(500).send(err);

	// buyer = req.body; 
	// var len = req.body.myFavoriteRetailers.length;
	// for (var i=0 ; i<len ; i++) {
	// 	buyer.myFavoriteRetailers.push(req.body.myFavoriteRetailers[i]);
	// }  

    buyer.save(function(err){
      if(err) 
        return res.status(500).send(err);

      res.json({ 
        success: true,
        status: 200,
        message: 'buyer updated', 
        data: buyer
      });

    });
  });
};

// Create endpoint /api/buyers/:beer_id for DELETE
exports.deleteBuyer = function(req, res) {

  Buyer.findByIdAndRemove(req.params.buyer_id, function(err) {
    if (err)
      return res.status(500).send(err);

	res.json({ 
		success: true,
		status: 200,
		message: 'buyer removed', 
	});

  });
};

exports.updateBuyerFavoriteRetailers = async function(req, res, next) {

	try {
		const { buyer_id } =  req.params;
		const { retailer_email } = req.body;
		console.log("req.params",req.params);
		console.log("req.body",req.body);
		
		const retailer = await Retailer.findOne({email: retailer_email});
		let newFavoriteRetailer = {
			_id: retailer._id,
			storeName: retailer.store.name,
			isDeliveryService: retailer.store.isDeliveryService,
			isPickUpService: retailer.store.isPickUpService,
			storeImgUrl: retailer.store.imgUrl
		}
	
		console.log("KEVIN => ", newFavoriteRetailer);
		const buyer = await Buyer.findById(buyer_id);
		
		buyer.myFavoriteRetailers.push(newFavoriteRetailer);
		const oldBuyer = await buyer.save();
		
		res.json({
			success: true,
			status: 200,
			message: "favorite retailer updated",
			entity: oldBuyer
		  });
	} catch (error) {
		res.status(500).send(error);
		console.log(error);
	}

}
// exports.updateBuyerFavoriteRetailers = function(req, res) {
//   Buyer.findById(req.params.buyer_id, function(err, buyer){
// 	if(err) 
// 	  return res.sender(err);
	
// 	buyer.myFavoriteRetailers.push(req.body.myFavoriteRetailers);

// 	buyer.save(function(err) {
// 	  if (err)
// 		return res.status(500).send(err);
	  
// 	  res.json({
// 		  success: true,
// 		  status: 200,
// 		  message: "favorite retailer updated",
// 	  });
// 	});
//   });
// }

exports.updateBuyerAddress = function(req, res) {
	Buyer.findById(req.params.buyer_id, function(err, buyer){
	  if(err) 
		return res.sender(err);
	  
	  buyer.address = { 
		streetName: req.body.address.streetName,
		streetnumber: req.body.address.streetnumber,
		district: req.body.address.district,
		city: req.body.address.city,
		department: req.body.address.department,
		country: req.body.address.country,
		reference: req.body.address.reference,
		details: req.body.address.details
	  },
  
	  buyer.save(function(err) {
		if (err)
		  return res.status(500).send(err);
		
		res.json({
			success: true,
			status: 200,
			message: "favorite retailer updated",
		});
	  });
	});
  }