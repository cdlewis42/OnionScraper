var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    noteTitle:{
        type:String
    },
    note: {
        type: String
    }
})
var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article