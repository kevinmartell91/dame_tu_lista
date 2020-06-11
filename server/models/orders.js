var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var orderSchema = new Schema({
  createdOn: { type: Date, default: Date.now() },  
  shipping: {
    buyer: {
      _id: String,
      name: String,
      email: String,
      phoneNumber: String       
    },
    deliveryNotes: String,
    address: {
      streetName: String,
      streetnumber: String,
      district: String,
      city: String,
      department: String,
      country: String,
      reference: String,
      details: String   
    },
    tracking: {
      company: String,
      trackingNumber: String,
      orderStatus: [[String, Date]],
      estimatedDelivery: String
    },
  },
  payment: {
    amount: Number,
    method: String,
    transaction_id: String
  },

  products: [{
    _id: String,
    categoryImageUrl: String,
    categoryName: String,
    varietyImageUrl: String,
    varietyName: String,
    currency: String,
    price: String,
    isSmallSize: Boolean,
    isMediumSize: Boolean,
    isBigSize: Boolean,
    isKilo: Boolean,
    isUnit: Boolean,
    isOrganic: Boolean,
    isSeasonal: Boolean,
    isMaturityDetails: Boolean,
    maturityImageUrl: String,
    maturityName: String,
    maturityInfo: String,
    maturityEatIn: String,
    maturityLastFor: String, 
    isInStock: Boolean       
  }]

});

orderSchema.pre('save', function(next) {
  
  let order = this;
  if(!order.isModified || !order.isNew) {
    next();
  } else {
    order.shipping.tracking.orderStatus = ["generated_by_buyer", Date.now() ];
    next();
  }

  next();

});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;

// {generated_by_buyer: Boolean, date: Date},
// {seen_by_retailer: Boolean, date: Date},
// {packaged_by_retailer: Boolean, date: Date},
// {received_by_driver: Boolean, date: Date},
// {ontrack_by_driver: Boolean, date: Date},
// {delivered_by_driver: Boolean, date: Date},
// {order_finished: Boolean, date: Date},