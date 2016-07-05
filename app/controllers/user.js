
var userPort = require("../models/user");
/*
					用户操作 begin
*/
//注册
exports.showSignup = function(req, res){
	res.render('signup',{
		title : '注册',
	})
}
exports.showSignin = function(req, res){
	res.render('signin',{
		title : '登陆',
	})
}
exports.signup = function(req, res){
	console.log(1111)
	var userObj = req.body.user;
	var _user = new userPort(userObj);
		console.log(_user)

	userPort.getByName(_user.name, function(result){
		if(result){
			res.redirect("/signin")
		};
	});
	_user.save(function(err, user){	
		if(err){console.log(err);return;}
		console.log(user)
		res.redirect("/")
	});
};

//登陆
exports.signin = function(req, res){
	var userObj = req.body.user;
	var _user = new userPort(userObj);
	userPort.isUser(_user.name,_user.password, function(result){
		if(result){
			req.session.user = result;
			res.redirect("/");
		}else{
			res.redirect("/signup")
		}
	});
};
//注销
exports.logout = function(req, res){
	delete req.session.user;
	 // delete app.locals.user;

	res.redirect("/");
};
//用户列表
exports.userList = function(req, res){
	userPort.getAll(function(users){
		res.render("userList",{
			title : "用户列表",
			users : users
		});
	});
};

//是否登录
exports.isSignin = function(req, res, next){
	var user = req.session.user;
	if(!user){
		return res.redirect("/signin");
	};
	next();
}

//user is role
exports.isRole = function(req, res, next){
	var user = req.session.user;
	if(user.role <= 10){
		return res.redirect("/signin");
	}
	next();
}
/*
				用户操作  end
*/