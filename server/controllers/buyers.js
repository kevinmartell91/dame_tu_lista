
// Load required packages
var Buyer = require('../models/buyers');
const Retailer = require('../models/retailers');
const Order = require('../models/orders')

// creating endpoint /api/buyers POST
exports.postBuyers = function(req, res) {
	// creating a new instance of the Buyers model
	var buyer = new Buyer();

	// setting buyer properties that come from POST
	buyer.password = req.body.password; 
	buyer.name = req.body.name; 
	buyer.email = req.body.email; 

	
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
		
		const retailer = await Retailer.findOne({email: retailer_email});
		let newFavoriteRetailer = {
			_id: retailer._id,
			storeName: retailer.store.name,
			isDeliveryService: retailer.store.isDeliveryService,
			isPickUpService: retailer.store.isPickUpService,
			storeImgUrl: retailer.store.imgUrl,
			email: retailer.email,
			phoneNumber: retailer.phoneNumber
		}
	
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
	}

}

// Create endpoint /api/buyers-address/:buyer_id for PATCH
exports.updateBuyerAddress = async function(req, res, next) {

	
	let addressData = req.body;
	let id = req.params.buyer_id;

	const buyerUpdated = 
		await Buyer.findByIdAndUpdate(id, addressData, {new: true});
	
	if(buyerUpdated) {
		res.json({
			success: true,
			status: 200,
			message: "buyer address updated",
			entity: buyerUpdated
		});
	} else {
		res.json({
			success: false,
			status: 500,
			message: "buyer adderess updated",
			entity: buyerUpdated
		});
	}

}

exports.getOrderHistory = async function(req, res, next) {

	try {
		const { buyer_id } =  req.params;
		const { retailer_email } = req.body;
		
		const orderHistory = await Order.find({'shipping.buyer._id' : buyer_id});

		
		
		res.json({
			success: true,
			status: 200,
			message: "orderHistory retrieved",
			data: orderHistory
		  });
	} catch (error) {
		res.status(500).send(error);
	}

}