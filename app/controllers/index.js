//var moviePort = require("../models/movie");
var category = require("../models/Movie_Category");


// index page
exports.index = function (req, res) {
    category.getAll().populate({path: "movies", options: {limit: 0}}).exec(function (err, categorys) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('index', {
            title: "电影站",
            categorys: categorys,
        })
    });
};


exports.search = function (req, res) {
    var pageIndex = parseInt(req.query.pageIndex);
    var catId = req.query.cat;
    var count = 3;
    var index = pageIndex * count;


    category.getById(catId).populate({path: "movies"}).exec(function (err, category) {
        if (err) {
            console.log(err);
            return;
        }

        var movies = category.movies || [];

        res.render('results', {
            title: category.name,
            movies: movies,
        })
    });

}