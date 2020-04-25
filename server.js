var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

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

// TO DO: Change end point to Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//get route to scrape news site
app.get("/scrape", function (req,res){
    axios.get("https://www.theonion.com/").then(function(response){
        //saving cheerio to variable for shorthand
        var $ = cheerio.load(response.data)
    })
})

//app listener
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });