var Products = require("../models/products");
var Retailer = require("../models/retailers");

exports.getAirtableRecords = async function (req, res, next) {
  var Airtable = require("airtable");
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "keyNqSR6NoYacM8nC",
  });
  var base = Airtable.base("app4dtPR3GvMixMHE");
  const data = base("products");
  const all = data.select({ view: "Grid view" });

  let id = req.params.retailer_id;
  let productsList = [];

  const records = await all.firstPage();
  if (records) {
    // extract fields of importance
    records.forEach((rec) => {
      // push to productList for each product
      productsList.push(extractProductList(rec.fields));
    });
  } else {
    res.json({
      success: false,
      status: 500,
      message: "no record found in airtable - fail",
    });
  }

  let retailer = await Retailer.findById(id);
  if (retailer) {
    retailer.store.productsList = [];
    // then push to retailer-product-list/:id
    for (var i = 0; i < productsList.length; i++) {
      retailer.store.productsList.push(productsList[i]);
    }

    // console.log("findById - object", retailer.name);
    // console.log("retailer.store.productsList", retailer.store.productsList);

    const isSaved = await retailer.save();

    if (isSaved) {
      res.json({
        success: true,
        status: 200,
        message: "dtlAirtableToMongo success",
        data: retailer.store.productsList,
      });
    } else {
      res.json({
        success: false,
        status: 500,
        message: "dtlAirtableToMongo fail",
      });
    }
  } else {
    res.json({
      success: false,
      status: 500,
      message: "retailer does not exist - fail",
    });
  }
};

function extractProductList(aritable) {
  let product = {};

  product.varietyImageUrl = aritable.Variety_Img[0].thumbnails.large.url;
  product.categoryImageUrl = aritable.Category_Img[0].thumbnails.large.url;
  product.maturityImageUrl = aritable.Maturity_Img[0].thumbnails.large.url;

  product.type = aritable.type;
  product.isVisible = aritable.isVisible;

  product.categoryName = CapitalizedFirstChar(aritable.categoryName);

  product.varietyName =
    aritable.varietyName == "-"
      ? "Normal"
      : CapitalizedFirstChar(aritable.varietyName);

  product.currency = aritable.currency;
  product.price = aritable.price;
  product.isMediumSize = aritable.isMediumSize
    ? (product.isMediumSize = true)
    : (product.isMediumSize = false);
  product.isUnit = aritable.isUnit
    ? (product.isUnit = true)
    : (product.isUnit = false);
  product.isSeasonal = aritable.isSeasonal
    ? (product.isSeasonal = true)
    : (product.isSeasonal = false);
  product.isMaturityDetails = aritable.isMaturityDetails
    ? (product.isMaturityDetails = true)
    : (product.isMaturityDetails = false);
  product.maturityName = CapitalizedFirstChar(aritable.maturityName);
  product.maturityInfo = aritable.maturityInfo;
  product.maturityEatIn =
    aritable.maturityEatIn !== undefined
      ? aritable.maturityEatIn.toString()
      : "0";
  product.maturityLastFor =
    aritable.maturityLastFor !== undefined
      ? aritable.maturityLastFor.toString()
      : "0";
  product.isInStock = aritable.isInStock
    ? (product.isInStock = true)
    : (product.isInStock = false);
  product.isSmallSize = aritable.isSmallSize
    ? (product.isSmallSize = true)
    : (product.isSmallSize = false);
  product.isKilo = aritable.isKilo
    ? (product.isKilo = true)
    : (product.isKilo = false);
  product.isOrganic = aritable.isOrganic
    ? (product.isOrganic = true)
    : (product.isOrganic = false);
  product.isBigSize = aritable.isBigSize
    ? (product.isBigSize = true)
    : (product.isBigSize = false);

  product.toppings = extractToppingsObject(
    aritable.type_toppings,
    aritable.price_toppings,
    aritable.isEnable_toppings,
    aritable.title_toppings,
    aritable.name_toppings,
    aritable.isMultipleSelection_toppings
  );

  return product;
}

const CapitalizedFirstChar = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const extractToppingsObject = (
  type_toppings,
  price_toppings,
  isEnable_toppings,
  title_toppings,
  name_toppings,
  isMultipleSelection_toppings
) => {
  // let typeFrequencyById = new Map<string, number[]>();
  let typeFrequencyById = new Object();
  let toppings = [];

  if (type_toppings) {
    typeFrequencyById = extracFrequencyByType(type_toppings);
  }

  if (typeFrequencyById) {
    for (var key in typeFrequencyById) {
      const freqIdArr = typeFrequencyById[key];
      let topping = [];
      // console.log("freqIdArr", freqIdArr);
      topping.type_toppings = key;
      topping.price_toppings = [];
      topping.name_toppings = [];
      freqIdArr.forEach((id) => {
        topping.price_toppings.push(price_toppings[id]);
        topping.isEnable_toppings = isEnable_toppings[id];
        topping.title_toppings = title_toppings[id];
        topping.name_toppings.push(name_toppings[id]);
        topping.isMultipleSelection_toppings =
          isMultipleSelection_toppings[id] === null
            ? false
            : isMultipleSelection_toppings[id];
      });
      toppings.push(topping);
    }
    return toppings;
  }

  return null;
};

const extracFrequencyByType = (type_toppings) => {
  let frequencyByTypeToppings = new Object();

  for (let i = 0; i < type_toppings.length; i++) {
    const type = type_toppings[i];

    if (frequencyByTypeToppings.hasOwnProperty(type)) {
      //push new id only
      frequencyByTypeToppings[type].push(i);
    } else {
      // push a key and id
      frequencyByTypeToppings[type] = [i];
    }
  }

  return frequencyByTypeToppings;
};
