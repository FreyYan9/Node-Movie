var mongoDB = require("mongoose");
var Movie_Category = require("../schemas/Movie_Category");
var movie_category = mongoDB.model("Movie_Category",Movie_Category);
module.exports = movie_category;