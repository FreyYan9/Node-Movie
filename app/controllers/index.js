var moviePort = require("../models/movie");
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
    var pageIndex = parseInt(req.query.pageIndex) || 0;
    var catId = req.query.cat;
    var count = 3;

    var keyWold = req.query.keyWold;

    if (catId) {
        category.getById(catId).populate({path: "movies"}).exec(function (err, category) {
            if (err) {
                console.log(err);
                return;
            }
            var movies = category.movies || [];
            var totalCount = Math.ceil(movies.length / count);

            if (pageIndex < 0) {
                pageIndex = 0;
            } else if (pageIndex >= totalCount) {
                pageIndex = totalCount - 1;
            }

            var index = pageIndex * count;
            var moviesPage = movies.slice(index, index + count);

            res.render('results', {
                category: category,
                movies: moviesPage,
                totalCount: totalCount,
                pageIndex: pageIndex,
            })
        });
    }else{
        moviePort.find({title : new RegExp(keyWold + ".*", 'i')}).exec(function (err, movies) {
            if (err) {
                console.log(err);
                return;
            }
            var totalCount = Math.ceil(movies.length / count);

            if (pageIndex < 0) {
                pageIndex = 0;
            } else if (pageIndex >= totalCount) {
                pageIndex = totalCount - 1;
            }

            var index = pageIndex * count;
            var moviesPage = movies.slice(index, index + count);
            var param = {name : ''};
            param.name = "[ " + keyWold.toString() + " ]  的搜索结果 :";

            res.render('results', {
                category: param,
                movies: moviesPage,
                totalCount: totalCount,
                pageIndex: pageIndex,
            })
        });
    }
}