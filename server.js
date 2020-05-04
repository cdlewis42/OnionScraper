var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
require("./routes/apiRoutes")(app)
mongoose.connect("mongodb://localhost/onionScraperDB", { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});