var mongoDB = require("mongoose");
// var bcrypt = require("bcrypt-nodejs");
var userSchema = new mongoDB.Schema({
	name : {
		unique : true, // 唯一
		type : String
	},
	password : String,
	// defualt : 1 : user
	// 1 : verified uesr
	// 2 : professonal user
	role : {
		type : Number,
		default : 0
	}, 
	meta : {
		createDate : {
			type : Date,
			default : Date.now()
		},
		updateDate : {
			type : Date,
			default : Date.now()
		}
	}
});


userSchema.pre("save",function(next){
	if(this.isNew){
		this.meta.createDate = this.meta.updateDate = Date.now();
	}else{
		this.meta.updateDate = Date.now();
	}

	// bcrypt.getSalt( 10 , function(err, salt){
	// 	if(err) return next(err);

	// 	bcrypt.hash(this.password, null, null, function(err, pwd){
	// 		if(err) return next(err);
	// 		this.password = pwd;
	// 		next();
	// 	});
	// });

	next();
});

userSchema.statics = {
	getAll : function(cb){
		return this.find({}, function(err, obj){
			cb(obj);
		})
		// .exec(cb);
	},
	getById : function(id, cb){
		return this.findById(id,function(err, obj){
				if(err){console.log(err);return;}
            	cb(obj);
            })
	},
	getByName : function(name, cb){
		return this.findOne({name:name},function(err,obj){
				if(err){console.log(err);return;}
				cb(obj);
		});
	},
	isUser : function(name, pwd, cb){
		this.findOne({name:name,password:pwd},function(err, obj){
			if(err){console.log(err);return;}
			// obj?cb(1):cb(0);
			cb(obj)
		});
	},
}


module.exports = userSchema;