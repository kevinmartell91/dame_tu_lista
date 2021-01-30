var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

var authenticationController = require('../controllers/authentication');
var retailerController = require('../controllers/retailers');
var buyerController = require('../controllers/buyers.js');
var orderController = require('../controllers/orders.js');


// used to create, sign, and verify tokens
// sample =>https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// var validateToken = require('../utils.js').validateToken;
 var authorizationMiddleware = require ('../routes/simple_jwt').authorizationMiddleware;

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Routes porotected by JWT verification if add the authorizationMiddleware 
// Create endpoint handlers for /authenticate
router.route('/authenticate')
  .post(authenticationController.postAuthenticate);

// Create endpoint handlers for /buyers/:buyer_id
router.route('/buyers/:buyer_id')
  .get( buyerController.getBuyer)
  .put(buyerController.putBuyer)
  .delete(buyerController.deleteBuyer);
  
router.route('/buyers')
  .post(buyerController.postBuyers)
  .get(buyerController.getBuyers);

router.route('/buyers-favorite-retailers/:buyer_id')
  .patch(buyerController.updateBuyerFavoriteRetailers);

router.route('/buyers-address/:buyer_id')
  .patch(buyerController.updateBuyerAddress);

router.route('/buyer-order-history/:buyer_id')
  .get(buyerController.getOrderHistory);


// Create endpoint handlers for /retailers/:retailer_id
router.route('/retailers/:retailer_id')
  .get(retailerController.getRetailer)
  .put(retailerController.putRetailer)
  .delete(retailerController.deleteRetailer);

router.route('/retailers')
  .post(retailerController.postRetailers)
  .get(retailerController.getRetailers);
  
router.route('/retailer-store/:retailer_id')
  .put(retailerController.putRetailerStore);
  

    
router.route('/retailer-product-list/:retailer_id')
  .post(retailerController.postRetailerProductList)
  .put(retailerController.putRetailerProductList);
 
router.route('/dlt-airtable-mongo/:retailer_id')
 .get(retailerController.dltAirtableToMongo);


// Create endpoint handlers for /orders/:order_id
router.route('/orders/:order_id')
  .get(orderController.getOrder)
  .put(orderController.putOrder)
  .delete(orderController.deleteOrder);

// Create endpoint handlers for /orders/:retailer_id
router.route('/orders-by-retailer-id/:retailer_id')
  .get(orderController.getOrdersByRetailerId);

router.route('/orders')
  .post(orderController.postOrders)
  .get(orderController.getOrders);

router.route('/delete-all-orders/:retailer_id')
  .delete(orderController.deleteAllOrdersByReatailerId);
    
router.route('/:retailer_store_name')
  .get(retailerController.getRetailerByStoreName);

module.exports = router;
