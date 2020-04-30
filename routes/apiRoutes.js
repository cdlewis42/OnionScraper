var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models")

//get route to scrape news site

function apiRoutes(app) {
app.get("/", function (req,res){
axios.get("https://www.theonion.com/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);
  // An empty array to save the data that we'll scrape
    var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
    $("article").each(function(i, element) {

    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title,
      link
    });
    console.log(results)
    // Create a new Article using the `result` object built from scraping
    db.Article.create(results)
      .then(function(dbArticle) {
        // View the added result in the console
        //console.log("this is dbArticle " +dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
    })
    app.get("/articles", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle)
            }).catch(function (err) {
                res.json(err)
            })
    });
}

module.exports = apiRoutes