var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productShema = new Schema({
  categoryImageUrl: { type: String, default: "" },
  categoryName: { type: String, default: "" },
  varietyImageUrl: { type: String, default: "" },
  varietyName: { type: String, default: "" },
  currency: { type: String, default: "" },
  price: { type: Number, default: false },
  isSmallSize: { type: Boolean, default: false },
  isMediumSize: { type: Boolean, default: false },
  isBigSize: { type: Boolean, default: false },
  isKilo: { type: Boolean, default: false },
  isUnit: { type: Boolean, default: false },
  isOrganic: { type: Boolean, default: false },
  isSeasonal: { type: Boolean, default: false },
  isMaturityDetails: { type: Boolean, default: false },
  maturityImageUrl: { type: String, default: "" },
  maturityName: { type: String, default: "" },
  maturityInfo: { type: String, default: "" },
  maturityEatIn: { type: String, default: "" },
  maturityLastFor: { type: String, default: "" },
  isInStock: { type: Boolean, default: false },

  type_toppings: { type: String, default: "" },
  price_toppings: { type: [Number], default: [] },
  isEnable_toppings: { type: Boolean, default: false },
  title_toppings: { type: String, default: "" },
  name_toppings: { type: [String], default: [] },
  isMultipleSelection_toppings: { type: Boolean, default: false },
});

var Products = mongoose.model("Products", productShema);

module.exports = Products;
