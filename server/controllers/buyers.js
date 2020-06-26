
// Load required packages
var Buyer = require('../models/buyers');
const Retailer = require('../models/retailers');

// creating endpoint /api/buyers POST
exports.postBuyers = function(req, res) {
	// creating a new instance of the Buyers model
	var buyer = new Buyer();

	// setting buyer properties that come from POST
	// buyer.username = req.body.username; 
	buyer.password = req.body.password; 
	// buyer.name = req.body.name; 
	// buyer.lastname = req.body.lastname; 
	buyer.email = req.body.email; 
	// buyer.phoneNumber = req.body.phoneNumber; 

	// buyer.lastLoginDate = req.body.lastLoginDate; 
	// buyer.last_order = req.body.last_order; 

	// var len = req.body.myFavoriteRetailers.length;
	// for (var i=0 ; i<len ; i++) {
	// 	buyer.myFavoriteRetailers.push(req.body.myFavoriteRetailers[i]);
	// }
	
	buyer.save(function(err){
		if (err) {
			return  res.json({ 
					success: false,
					status: 500,
					message: 'buyer not added', 
					data: err
				}
			);
		}

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

// Create endpoint /api/buyers/:buyer_id for PUT
exports.putBuyer = async function(req, res, next) {


	// use this put method to update buyer data only
	let id = req.params.buyer_id;
	let buyerData = req.body;

	const buyerUpdated = 
		await Buyer.findByIdAndUpdate(id, buyerData, { new: true});

	if(buyerUpdated) {
		console.log("updateBuyerAddress - PATCH");
		res.json({
			success: true,
			status: 200,
			message: "favorite retailer updated",
			entity: buyerUpdated
		});
	} else {
		res.json({
			success: false,
			status: 500,
			message: "favorite not retailer updated",
			entity: buyerUpdated
		});
	}
};

// Create endpoint /api/buyers-favorite-retailers/:buyer_id for PATCH
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

// Create endpoint /api/buyers-address/:buyer_id for PATCH
exports.updateBuyerAddress = async function(req, res, next) {

	
	let addressData = req.body;
	let id = req.params.buyer_id;
	const buyerUpdated = 
		await Buyer.findByIdAndUpdate(id, addressData, {new: true});
	
	if(buyerUpdated) {
		console.log("updateBuyerAddress - PATCH");
		res.json({
			success: true,
			status: 200,
			message: "favorite retailer updated",
			entity: buyerUpdated
		});
	} else {
		res.json({
			success: false,
			status: 500,
			message: "favorite not retailer updated",
			entity: buyerUpdated
		});
	}

  }