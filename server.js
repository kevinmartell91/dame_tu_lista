const stage = require("./server/CONFIG");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const path = require("path");
const http = require("http");
const cors = require("cors");
var mongoose = require("mongoose");
var compression = require("compression");

// Connect to Mongo database
var connection = require("./server/config/database")(mongoose);
//var models = require('./models/users')(connection);

// Get our API routes
const api = require("./server/routes/api");

const app = express();

// midelwares
// Compression
app.use(compression());
// Parsers for POST data
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// use morgan to log requests to the console
if (stage.environment !== "production") {
  app.use(logger("dev"));
}

// Point static path to dist
app.use(express.static(path.join(__dirname, "client/dist/app")));

//set the cors;
// http://restlet.com/company/blog/2015/12/15/understanding-and-using-cors/
app.use(cors());

// Set our api routes
app.use("/api", api);

// Catch all other routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/app/index.html"));
});

/**
 * Listen on provided port, on all network interfaces.
 * Get port from environment and store in Express.
 */
app.listen(`${stage.port}`, () => {
  // server.listen(port, () => {
  console.log(`API running on localhost:${stage.port}`);
});
// https://blog.risingstack.com/node-js-tutorial-russian-translation/
// https://blog.risingstack.com/node-hero-node-js-security-tutorial/

// https://dev.to/mtovmassian/how-to-optimize-module-encapsulation-in-nodejs-cp2
