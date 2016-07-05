//var moviePort = require("../models/movie");
var category = require("../models/Movie_Category");



// index page 
exports.index = function(req,res){
	category.getAll().populate({path : "movie", options :{ limit : 3 }}).exec(function(err, categorys){
		if(err){console.log(err);return;}
		res.render('index',{
			title : "电影站",
			categorys : categorys,
		})
	});
};