var Products = require("../models/products");
var Retailer = require("../models/retailers");
const STORES_DATA = [
  {
    store_id: "5f1a184959b1a4309a66fc55",
    name: "fruteria de kevin",
    idBase: "app90UT0ZXO2CSQwS",
    base: "dtlNewConcept_DB",
    view: "Grid view",
  },
  {
    store_id: "60778625d9232c1ec44f5ec2",
    name: "wawito",
    idBase: "app4dtPR3GvMixMHE",
    base: "products_v2",
    view: "Grid view",
  },
  {
    store_id: "60a14741ab6ef66381411f2f",
    name: "amaranta",
    idBase: "appB5iKJ3sU45AuXT",
    base: "products",
    view: "Grid view",
  },
];

exports.getAirtableRecords = async function (req, res, next) {
  try {
    // Wawito test id
    // 60778625d9232c1ec44f5ec2
    let id = req.params.retailer_id;

    var Airtable = require("airtable");
    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      apiKey: "keyNqSR6NoYacM8nC",
    });
    var airtableDataBase = STORES_DATA.find((obj) => obj.store_id === id);
    var base = Airtable.base(airtableDataBase.idBase);
    const data = base(airtableDataBase.base);
    const all = data.select({ view: airtableDataBase.view });

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
  } catch (error) {
    console.log("ERROR", error);
  }
};

function extractProductList(airTable) {
  let product = new Object();
  try {
    product.varietyImageUrl = airTable.Variety_Img[0].thumbnails.large.url;
    product.categoryImageUrl = airTable.Category_Img[0].thumbnails.large.url;
    product.maturityImageUrl = airTable.Maturity_Img[0].thumbnails.large.url;

    product.type = airTable.type;
    product.isVisible = airTable.isVisible;

    product.categoryName = CapitalizedFirstChar(airTable.categoryName);

    product.varietyName =
      airTable.varietyName == "-"
        ? "Normal"
        : CapitalizedFirstChar(airTable.varietyName);

    product.currency = airTable.currency;
    product.price = airTable.price;
    product.isMediumSize = airTable.isMediumSize
      ? (product.isMediumSize = true)
      : (product.isMediumSize = false);
    product.isUnit = airTable.isUnit
      ? (product.isUnit = true)
      : (product.isUnit = false);
    product.isSeasonal = airTable.isSeasonal
      ? (product.isSeasonal = true)
      : (product.isSeasonal = false);
    product.isMaturityDetails = airTable.isMaturityDetails
      ? (product.isMaturityDetails = true)
      : (product.isMaturityDetails = false);
    product.maturityName = CapitalizedFirstChar(airTable.maturityName);
    product.maturityInfo = airTable.maturityInfo;
    product.maturityEatIn =
      airTable.maturityEatIn !== undefined
        ? airTable.maturityEatIn.toString()
        : "0";
    product.maturityLastFor =
      airTable.maturityLastFor !== undefined
        ? airTable.maturityLastFor.toString()
        : "0";
    product.isInStock = airTable.isInStock
      ? (product.isInStock = true)
      : (product.isInStock = false);
    product.isSmallSize = airTable.isSmallSize
      ? (product.isSmallSize = true)
      : (product.isSmallSize = false);
    product.isKilo = airTable.isKilo
      ? (product.isKilo = true)
      : (product.isKilo = false);
    product.isOrganic = airTable.isOrganic
      ? (product.isOrganic = true)
      : (product.isOrganic = false);
    product.isBigSize = airTable.isBigSize
      ? (product.isBigSize = true)
      : (product.isBigSize = false);

    product.toppings = extractToppingsObject(
      airTable.type_toppings,
      airTable.price_toppings,
      airTable.isEnable_toppings,
      airTable.title_toppings,
      airTable.name_toppings,
      airTable.isMultipleSelection_toppings
    );

    product.description = airTable.description;
  } catch (error) {}
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
      topping.type_toppings = CapitalizedFirstChar(key);
      topping.price_toppings = [];
      topping.name_toppings = [];
      freqIdArr.forEach((id) => {
        topping.price_toppings.push(price_toppings[id]);
        topping.isEnable_toppings = isEnable_toppings[id];
        topping.title_toppings = CapitalizedFirstChar(title_toppings[id]);
        topping.name_toppings.push(CapitalizedFirstChar(name_toppings[id]));
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
