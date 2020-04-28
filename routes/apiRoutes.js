var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models")

//get route to scrape news site
function apiRoutes(app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.theonion.com/").then(function (response) {
            //saving cheerio to variable for shorthand
            var $ = cheerio.load(response.data)
            var result = []
            $("div.element").each(function (i, element) {
                var title = $(element).find("a").text().trim()
                var link = $(element).find("a").attr("href")
                result.push({
                    title,
                    link
                })
                console.log("title")
                console.log("link")
                
            // $("article h2").each(function (i, element) {
            //     var title = $(element).find("a").text().trim()
            //     var link = $(element).find("a").attr("href")
            //     console.log(title)
            //     console.log(link)
            db.Article.create(result)
                     .then(function (dbArticle) {
                         // View the added result in the console
                         console.log(dbArticle);
                     })
                     .catch(function (err) {
                         // If an error occurred, log it
                         console.log(err);
                     });
             });

            res.send("Scrape Complete")
            console.log(dbArticle)
        })

    })
// This is for pushing data to the database
// app.post("/scrape", function(req,res){
//     for(let i = 0;i<article.length;i ++){
//         db.Article.create({
//             title:title[i],
//             link:link[i]
//         })
//     }
// })

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