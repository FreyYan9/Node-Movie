var index = require("../app/controllers/index");
var movie = require("../app/controllers/movie");
var user = require("../app/controllers/user");
var comment = require("../app/controllers/comment");
var category = require("../app/controllers/Movie_Category");


module.exports = function(app){
	app.use(function(req, res, next){
		var _user = req.session.user;
		app.locals.user =_user;
		next();
	});


	    
	/*				电影操作 begin				*/

	// index page  
	app.get('/' , index.index);

	// Movie
	app.get('/movie/:id' , movie.detail);
	app.get('/admin/movie/new' , user.isSignin, user.isRole,movie.new);
	app.get('/admin/movie/list' , user.isSignin, user.isRole, movie.list);
	app.get("/admin/movie/update/:id" , user.isSignin, user.isRole,movie.update);
	app.post("/admin/movie/new" , user.isSignin, user.isRole,movie.save);
	app.delete("/admin/list/:id" , user.isSignin, user.isRole,movie.del);

	/*					电影操作 end 				*/



	/*					用户操作 begin				*/

	//User
	app.get("/logout" , user.logout);
	app.get("/signin" , user.showSignin);
	app.get("/signup" , user.showSignup);
	app.get("/userList" ,user.isSignin, user.isRole, user.userList);
	app.post("/user/signin" , user.signin);
	app.post("/user/signup" , user.signup);
	

	/*					用户操作  end 				*/



	/*					评论操作  begin 				*/

	app.post("/user/comment", user.isSignin, comment.save);


	/*					评论操作  end 				*/

	/*					分类操作  begin 				*/
	app.get("/admin/Movie_category/new", user.isSignin, category.new);
	app.post("/admin/Movie_category/save", user.isSignin, category.save);
	app.get("/admin/Movie_category/list", user.isSignin, category.list);


	/*					分类操作  end 				*/

}