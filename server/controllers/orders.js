
// Load required packages
var Order  = require('../models/orders');

// creating endpoint /api/orders POST
exports.postOrders = function(req, res) {
    // creating a new instance of the Orders model
  let orderData = req.body;
  var order = new Order(orderData);
  // order.shipping = req.body.shipping;
  // order.payment = req.body.payment;
  // order.cart = req.body.cart;

 
  order.save(function(err){
        
    if (err){
      console.log("ERROR ", err);
        return res.status(500).send(err);
    }
    console.log("postOrders", order); 
    res.json({ 
      success: true,
      status: 200,
      message: 'order added', 
      data: order
    });
    
  });
};

// Create endpoint /api/orders for GET
exports.getOrders = function(req, res) {

  Order.find(function(err, orders) {
    if (err)
      return res.status(500).send(err);

    res.json({ 
        success: true,
        status: 200,
        message: 'orders list', 
        data: orders
    });
  });
};

// Create endpoint /api/orders/:user_id for GET
exports.getOrder = function(req, res) {

  Order.findById(req.params.order_id, function(err, order) {
  
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
exports.putOrder = function(req, res) {

  let update = req.body;
  Order.findById(req.params.order_id, function(err, order) {
    if (err)
      return res.status(500).send(err);

    // just updating the order status
	order.shipping.tracking.orderStatus.push(req.body);

    order.save(function(err){
      if(err) {
        console.log("ERROR",err)
        return res.status(500).send(err);

      }

      res.json({ 
        success: true,
        status: 200,
        message: 'order updated', 
        data: order
      });

    });
  });
};

// Create endpoint /api/orders/:beer_id for DELETE
exports.deleteOrder = function(req, res) {

  Order.findByIdAndRemove(req.params.order_id, function(err) {
    if (err)
      return res.status(500).send(err);

	res.json({ 
		success: true,
		status: 200,
		message: 'order removed', 
	});

  });
};

exports.updateOrderFavoriteRetailers = function(req, res) {
  Order.findById(req.params.order_id, function(err, order){
	if(err) 
	  return res.sender(err);
	
	order.myFavoriteRetailers.push(req.body.myFavoriteRetailers);

	order.save(function(err) {
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

exports.updateOrderAddress = function(req, res) {
	Order.findById(req.params.order_id, function(err, order){
	  if(err) 
		return res.sender(err);
	  
	  order.address = { 
		streetName: req.body.address.streetName,
		streetnumber: req.body.address.streetnumber,
		district: req.body.address.district,
		city: req.body.address.city,
		department: req.body.address.department,
		country: req.body.address.country,
		reference: req.body.address.reference,
		details: req.body.address.details
	  },
  
	  order.save(function(err) {
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
