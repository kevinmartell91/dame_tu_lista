
// Load required packages
var Order = require('../models/orders');
var mogoose = require('mongoose')

// creating endpoint /api/orders POST
exports.postOrders = function (req, res) {
	// creating a new instance of the Orders model
	let orderData = req.body;
	var order = new Order(orderData);

	order.save(function (err) {

		if (err) {
			return res.status(500).send(err);
		}
		res.json({
			success: true,
			status: 200,
			message: 'order added',
			data: order
		});

	});
};

// Create endpoint /api/orders for GET
exports.getOrders = function (req, res) {

	Order.find(function (err, orders) {
		if (err)
			return res.status(500).send(err);

		console.log("ORDERS", JSON.parse(orders));
		res.json({
			success: true,
			status: 200,
			message: 'orders list',
			data: orders
		});
	});
};

// Create endpoint /api/orders/:user_id for GET
exports.getOrder = function (req, res) {

	Order.findById(req.params.order_id, function (err, order) {

		if (err)
			return res.status(500).send(err);

		res.json({
			success: true,
			status: 200,
			message: 'orders list',
			data: order
		});
	});
};

// Create endpoint /api/orders/:user_id for PUT
exports.putOrder = async function (req, res, next) {


	// use this put method to update buyer data only
	let id = req.params.order_id;
	let orderData = req.body;

	const orderUpdated =
		await Order.findByIdAndUpdate(id, orderData, { new: true });

	if (orderUpdated) {
		res.json({
			success: true,
			status: 200,
			message: "order updated",
			entity: orderUpdated
		});
	} else {
		res.json({
			success: false,
			status: 500,
			message: "order updated",
			entity: orderUpdated
		});
	}
};

// Create endpoint /api/orders/:beer_id for DELETE
exports.deleteOrder = function (req, res) {

	Order.findByIdAndRemove(req.params.order_id, function (err) {
		if (err)
			return res.status(500).send(err);

		res.json({
			success: true,
			status: 200,
			message: 'order removed',
		});

	});
};

// Create endpoint /api/orders for GET
exports.getOrdersByRetailerId = function (req, res) {



	let retailer_id = req.params.retailer_id;



	//   Order.find( {retailer_id: retailer_id, orderType: { $ne: 'sale_quote' }  } , function(err, orders) {
	Order.find({ retailer_id: retailer_id }, function (err, orders) {
		if (err)
			return res.status(500).send(err);

		console.log("orders=>", orders);
		res.json({
			success: true,
			status: 200,
			message: 'orders list',
			data: orders
		});
	});
};

exports.updateOrderFavoriteRetailers = function (req, res) {
	Order.findById(req.params.order_id, function (err, order) {
		if (err)
			return res.sender(err);

		order.myFavoriteRetailers.push(req.body.myFavoriteRetailers);

		order.save(function (err) {
			if (err)
				return res.status(500).send(err);

			res.json({
				success: true,
				status: 200,
				message: "favorite retailer updated",
			});
		});
	});
};

exports.updateOrderAddress = function (req, res) {
	Order.findById(req.params.order_id, function (err, order) {
		if (err)
			return res.sender(err);

		order.address = {
			streetName: req.body.address.streetName,
			streetnumber: req.body.address.streetnumber,
			apartmentNumber: req.body.address.apartmentNumber,
			district: req.body.address.district,
			city: req.body.address.city,
			department: req.body.address.department,
			country: req.body.address.country,
			reference: req.body.address.reference,
			details: req.body.address.details
		},

			order.save(function (err) {
				if (err)
					return res.status(500).send(err);

				res.json({
					success: true,
					status: 200,
					message: "favorite retailer updated",
				});
			});
	});
};

exports.deleteAllOrdersByReatailerId = async (req, res, next) => {
	const retailer_id = req.params.retailer_id;

	const orders_id = await Order.find({ retailer_id: retailer_id });
	console.log("orders_ids : ", orders_id.length);

	if(orders_id.length > 0) {

		orders_id.forEach(order => {
			
			(async()=>{
				
				const error = await Order.findByIdAndRemove(order._id);
				if (error) {
					console.log("Error",error);
				}else {
					console.log("Deleted:", order._id);

				}
			})();
	
		});
	}


	return res.json({ sucess: true });
}
