// Load required packages
var Retailer = require("../models/retailers");
var Product = require("../models/products");
var airTable = require("./airtable");

// Create endpoint /api/retailers for POST
exports.postRetailers = async function (req, res, next) {
  let buyerData = req.body;
  // Create a new instance of the Retailer model

  const newUser = await Retailer.findOne({ email: buyerData.email });

  if (newUser) {
    return res.json({
      success: false,
      status: 500,
      message: "retailer already exist",
      data: err,
    });
    // next();
  }

  const retailerData = new Retailer(buyerData);

  retailerData.save(function (err) {
    if (err) {
      return res.json({
        success: false,
        status: 500,
        message: "retailer not added",
        data: err,
      });
    }

    res.json({
      success: true,
      status: 200,
      message: "retailer added",
      data: retailerData,
    });

    // next();
  });
};

// Create endpoint /api/retailers for GET
exports.getRetailers = async function (req, res, next) {
  console.log("object");
  const retailerData = await Retailer.find();

  if (retailerData) {
    res.json({
      success: true,
      status: 200,
      message: "retailer added",
      data: retailerData,
    });
  } else {
    res.json({
      success: false,
      status: 500,
      message: "retailers not retrieved",
      data: retailerData,
    });
  }
};

// Create endpoint /api/retailers/:reatiler_id for GET
exports.getRetailer = async function (req, res, next) {
  let id = req.params.retailer_id;
  const retailerData = await Retailer.findById(id);

  if (retailerData) {
    res.json({
      success: true,
      status: 200,
      message: "retailer retrieved",
      data: retailerData,
    });
  } else {
    res.json({
      success: false,
      status: 500,
      message: "retailer not retrieved by id",
      data: retailerData,
    });
  }
};
// Create endpoint /api/:reatiler_name_store for GET
exports.getRetailerByStoreName = async function (req, res, next) {
  let store_name = req.params.retailer_store_name;
  const retailerData = await Retailer.findOne({ "store.nameUrl": store_name });

  if (retailerData) {
    res.json({
      success: true,
      status: 200,
      message: "retailer retrieved",
      data: retailerData,
    });
  } else {
    res.json({
      success: false,
      status: 500,
      message: "retailer not retrieved by store name",
      data: retailerData,
    });
  }
};

// Create endpoint /api/retailers/:retailer_id for PUT
exports.putRetailer = async function (req, res) {
  let id = req.params.retailer_id;
  let retailerData = req.body;
  const retailerUpdated = await Retailer.findByIdAndUpdate(id, retailerData, {
    new: true,
  });

  if (retailerUpdated) {
    res.json({
      success: true,
      status: 200,
      message: "retailer updated",
      data: retailerUpdated,
    });
  } else {
    res.json({
      success: false,
      status: 500,
      message: "retailer not updated",
      data: retailerUpdated,
    });
  }
};

// Create endpoint /api/retailers/:retailer_id for DELETE
exports.deleteRetailer = function (req, res) {
  Retailer.findByIdAndRemove(req.params.retailer_id, function (err) {
    if (err) return res.send(err);

    res.json({
      success: true,
      status: 200,
      message: "retailer deleted",
    });
  });
};

//ok
// Create endpoint /api/retailer-store/:retailer_id
exports.putRetailerStore = async function (req, res) {
  console.log("RETAILER TO UPDATE", req.body);
  let id = req.params.retailer_id;

  const retailer = await Retailer.findById(id);

  if (retailer) {
    // validate store name if exist
    const storeName = req.body.store.name.toLowerCase().trim();

    const retailerStoreNameExist = await Retailer.findOne({
      "store.name": storeName,
    });

    // if belong to the same retailer
    if (retailerStoreNameExist) {
      if (retailerStoreNameExist._id != id) {
        // cannot update with this name
        return res.json({
          success: false,
          status: 500,
          message:
            "store name already exit, choose another name for your store",
          data: null,
        });
      }
    } else {
      // set nameUrl value with a new store name
      retailer.store.nameUrl = getNameUrl(storeName);
    }

    // to do = > add UI to get this attribute
    retailer.phoneNumber = req.body.store.phoneNumber;
    retailer.store.name = storeName;
    retailer.store.imgUrl = req.body.store.imgUrl;
    retailer.store.isDeliveryService = req.body.store.isDeliveryService;
    retailer.store.isPickUpService = req.body.store.isPickUpService;
    retailer.store.deliveryInfo = req.body.store.deliveryInfo;
    retailer.store.pickUpInfo = req.body.store.pickUpInfo;
    retailer.store.productsList = retailer.store.productsList;

    retailer.store.address.streetName = req.body.store.address.streetName;
    retailer.store.address.streetNumber = req.body.store.address.streetNumber;
    retailer.store.address.district = req.body.store.address.district;
    retailer.store.address.city = req.body.store.address.city;
    retailer.store.address.department = req.body.store.address.department;
    retailer.store.address.country = req.body.store.address.country;
    retailer.store.address.reference = req.body.store.address.reference;
    retailer.store.address.details = req.body.store.address.details;

    const update = await retailer.save();

    if (update) {
      res.json({
        success: true,
        status: 200,
        message: "retailer's address updated",
        data: retailer,
      });
    } else {
      return res.status(500).send(err);
    }
  } else {
    return res.status(500).send(err);
  }
};
//ok
// Create endpoint /api/retailer-store/:retailer_id
exports.putRetailerStoreOrigin = function (req, res) {
  Retailer.findById(id, function (err, retailer) {
    if (err) return res.status(500).send(err);

    // to do = > add UI to get this attribute
    retailer.phoneNumber = req.body.phoneNumber;

    retailer.store.name = req.body.store.name;
    // create store name value
    retailer.store.nameUrl = getNameUrl(retailer.store.name);
    retailer.store.imgUrl = req.body.store.imgUrl;
    retailer.store.isDeliveryService = req.body.store.isDeliveryService;
    retailer.store.isPickUpService = req.body.store.isPickUpService;
    retailer.store.deliveryInfo = req.body.store.deliveryInfo;
    retailer.store.pickUpInfo = req.body.store.pickUpInfo;
    retailer.store.productsList = retailer.store.productsList;

    retailer.store.address.streetName = req.body.store.address.streetName;
    retailer.store.address.streetNumber = req.body.store.address.streetNumber;
    retailer.store.address.district = req.body.store.address.district;
    retailer.store.address.city = req.body.store.address.city;
    retailer.store.address.department = req.body.store.address.department;
    retailer.store.address.country = req.body.store.address.country;
    retailer.store.address.reference = req.body.store.address.reference;
    retailer.store.address.details = req.body.store.address.details;

    retailer.save(function (err) {
      if (err) return res.status(500).send(err);

      res.json({
        success: true,
        status: 200,
        message: "retailer's address updated",
        data: retailer,
      });
    });
  });
};

function getNameUrl(name) {
  const array = name.split(" ");
  var nameUrl = "";
  array.forEach((word) => {
    nameUrl += word;
    if (word != array[array.length - 1]) nameUrl += "-";
  });
  return nameUrl.toLowerCase();
}

exports.postRetailerProductList = function (req, res, next) {
  let id = req.params.retailer_id;
  let productsList = req.body.productsList;

  // console.log("id ", id);
  // console.log("prodictList", productsList);

  Retailer.findById(id, function (err, retailer) {
    if (err) return res.status(500).send(err);

    retailer.store.productsList = [];

    for (var i = 0; i < productsList.length; i++) {
      retailer.store.productsList.push(productsList[i]);
    }

    // let prodcutListUpdated = { productsList : retailer.store.productsList};
    // Retailer.findByIdAndUpdate(id, prodcutListUpdated, {new: true},function(err){
    retailer.save(function (err) {
      if (err) return res.status(500).send(err);

      res.json({
        success: true,
        status: 200,
        message: "retailer's product list added",
        data: retailer,
      });
      next();
    });
  });
};

exports.putRetailerProductList = function (req, res) {
  let id = req.params.retailer_id;
  Retailer.findById(id, function (err, retailer) {
    console.log("RETAILER => ", req.body.productsList);

    if (err) return res.status(500).send(err);

    // https://stackoverflow.com/questions/3507624/mongodb-nosql-keeping-document-change-history?noredirect=1&lq=1
    // https://www.infoq.com/articles/data-model-mongodb/
    // https://www.wpclipart.com/phps.php?q=orange&submit=Search

    const updatedProductsList = req.body.productsList;
    const db_productsList = retailer.store.productsList;

    for (let i = 0; i < updatedProductsList.length; i++) {
      // get one product by id and match it in DB by id
      const updatedProduct = updatedProductsList[i];

      for (let j = 0; j < db_productsList.length; j++) {
        if (updatedProduct._id == db_productsList[j]._id) {
          // categoryImageUrl
          // categoryName
          // varietyImageUrl
          // varietyName
          // currency
          // db_productsList[j].price = updatedProduct.price;
          // db_productsList[j].isSmallSize = updatedProduct.isSmallSize;
          // db_productsList[j].isMediumSize = updatedProduct.isMediumSize;
          // db_productsList[j].isBigSize = updatedProduct.isBigSize;
          // db_productsList[j].isKilo = updatedProduct.isKilo;
          // db_productsList[j].isUnit = updatedProduct.isUnit;
          // db_productsList[j].isOrganic = updatedProduct.isOrganic;
          // db_productsList[j].isSeasonal = updatedProduct.isSeasonal;
          // db_productsList[j].isMaturityDetails = updatedProduct.isMaturityDetails;
          // db_productsList[j].maturityImageUrl = updatedProduct.maturityImageUrl;
          // db_productsList[j].maturityName = updatedProduct.maturityName;
          // db_productsList[j].maturityInfo = updatedProduct.maturityInfo;
          // db_productsList[j].maturityEatIn = updatedProduct.maturityEatIn;
          // db_productsList[j].maturityLastFor = updatedProduct.maturityLastFor;
          // db_productsList[j].isInStock = updatedProduct.isInStock;

          // retailer.store.productsList[j] = db_productsList[j];
          retailer.store.productsList[j] = updatedProduct;
        }
      }
    }

    // let prodcutListUpdated = { productsList : retailer.store.productsList};
    // Retailer.findByIdAndUpdate(id, prodcutListUpdated, {new: true},function(err,retailer ){
    retailer.save(function (err) {
      if (err) return res.status(500).send(err);

      res.json({
        success: true,
        status: 200,
        message: "retailer's product list updated",
        data: retailer,
      });
    });
  });
};

exports.dtlAirtableToMongo = async function (req, res, next) {
  console.log("dtlAirtableToMongo");
  let result = await airTable.getAirtableRecords();
  // console.log(result);
  if (result) {
    res.json({
      success: true,
      status: 200,
      message: "dtlAirtableToMongo success",
      data: result.data,
    });
  } else {
    res.json({
      success: false,
      status: 500,
      message: "dtlAirtableToMongo fail",
    });
  }
};
