var mongoDB = require("mongoose");
var Schema = mongoDB.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
	movie : {type : ObjectId,ref : "movies"},
	from : {type : ObjectId,ref : "User"},
	content : String,
	reply : [{
		to : {type : ObjectId,ref : "User"},
		from : {type : ObjectId,ref : "User"},
		content : String
	}],
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


commentSchema.pre("save",function(next){
	if(this.isNew){
		this.meta.createDate = this.meta.updateDate = Date.now();
	}else{
		this.meta.updateDate = Date.now();
	}
	next();
});

commentSchema.statics = {
	getAll : function(cb){
		return this.find({}, function(err, obj){
			cb(obj);
		})
	},
	getById : function(id, cb){
		return this.findById(id,function(err, obj){
				if(err){console.log(err);return;}
            	cb(obj);
            })
	},
	getByMovie : function(id, cb){
		return this.find({movie:id});
	},
}


module.exports = commentSchema;