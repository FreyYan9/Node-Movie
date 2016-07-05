var category = require("../models/Movie_Category");

exports.new = function(req, res){
	res.render("Movie_Category",{
		title : "分类录入",
		category : {
			name : ''
		}
	});
}


exports.save = function(req, res){
	var _cate = req.body.category;
	var _category = new category(_cate);
	_category.save(function(err, cate){
		if(err){console.log(err);return;}
		res.redirect("/admin/Movie_category/list");
	});
}


exports.list = function(req, res){
	//category.getAll().exec(function(cates){
	//	console.log(cates)
	//	res.render("movie_category_list",{
	//		title : "电影分类列表",
	//		categorys : cates
	//	});
	//});
	category.getAll().exec(function(err, categorys){
		if(err){console.log(err);return;}
		res.render('movie_category_list',{
			title : "电影分类",
			categorys : categorys,
		})
	});
};