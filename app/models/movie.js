var mongoDB = require("mongoose");
var movieSchema = require("../schemas/movie");
var movie = mongoDB.model("Movie",movieSchema);
module.exports = movie;