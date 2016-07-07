var moviePort = require("../models/movie");
var comment = require("../models/comment");
var category = require("../models/Movie_Category");
var _ = require("underscore");
var path = require("path");
var fs  = require("fs");

/*
 电影操作 begin
 */



// detail page
exports.detail = function (req, res) {
    var _id = req.params.id;

    console.log(moviePort.updatePv(_id));
    //moviePort.update({_id :_id},{$inc : {pv : 1}}, function (err, obj) {
    //    if (err)
    //        console.log(err)
    //    console.log(obj)
    //})

    moviePort.getById(_id, function (movie) {

        comment.getByMovie(_id)
            .populate("from", "name")
            .populate("reply.from reply.to", "name")
            .exec(function (err, comments) {
                res.render('detail', {
                    title: movie.title,
                    movie: movie,
                    comments: comments
                })
            });


        // comment.find({movie : _id})
        // .populate("from", "name")
        // .exec(function(err,comments){
        // 	res.render('detail',{
        // 		title : movie.title,
        // 		movie : movie,
        // 		comments : comments
        // 	})
        // });
    });
};
// admin page
exports.new = function (req, res) {
    category.getAll().exec(function (err, cate) {
        res.render('admin', {
            title: "电影录入",
            category: cate,
            movie: {desc: "123123123"}
        })
    });
};
// list page
exports.list = function (req, res) {
    moviePort.getAll(function (err, movies) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('list', {
            title: "电影列表",
            movies: movies
        })
    });
};


//poster upload
exports.uploadPoster = function (req, res, next) {
    var poster = req.files.uploadPoster;
    var filePath = poster.path;
    var oldName = poster.originalFilename;
    var timestamp = Date.now();
    var type = poster.type.split("/")[1];
    var newName = timestamp + "." + type;
    var newPath = path.join(__dirname , "../../", "public/img/" + newName);


    if(oldName){
        fs.readFile(filePath, function (err, data) {
            fs.writeFile(newPath,data, function (err) {
                req.session.newName = newName;
                next();
            });
        })
    }else {
        next();
    }
}


//page post to add 
exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;

    if(req.session.newName){
        movieObj.poster = req.session.newName;
    }

    if (id) {
        moviePort.getById(id, function (movie) {
            var _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.redirect("/movie/" + movie._id);
            });
        })
    } else {
        var _movie = new moviePort(movieObj);
        var categoryId = movieObj.category;
        var categoruName = movieObj.categoryName;

        //如果没有选择分类, 则新增一个分类
        _movie.save(function (err, movie) {
            if (categoryId) {
                category.getById(categoryId, function (cate) {
                    cate.movies.push(movie._id);
                    cate.save(function (err, cateObj) {
                        res.redirect("/movie/" + movie._id);
                    });
                });
            } else {
                var categoryObj = new category({
                    name: categoruName,
                    movies: [movie._id]
                });
                categoryObj.save(function (err, cateObj) {
                    movie.category = cateObj._id;
                    movie.save(function (err, movieObj) {
                        res.redirect("/movie/" + movie._id);
                    })
                });
            }
        });
    }
};


exports.update = function (req, res) {
    var id = req.params.id;

    if (id) {
        moviePort.getById(id, function (movie) {
            category.getAll().exec(function (err, cate) {
                //console.log(cate)
                res.render("admin", {
                    title: "Movie 后台录入",
                    category: cate,
                    movie: movie
                });
            });
        });
    }

};

exports.del = function (req, res) {
    var id = req.params.id;
    if (id) {
        moviePort.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({result: "true"});
            }
        });
    }
    ;
};

/*
 电影操作 end
 */
