var mongoDB = require("mongoose");
var Schema = mongoDB.Schema;
var ObjectId = Schema.Types.ObjectId;

var movieSchema = new Schema({
	doctor : String,
	title : String,
	country : String,
	language : String,
	summary : String,
	year : Number,
	poster : String,
	desc : String,
	flash : String,
	category : {
		type : ObjectId,
		ref : "Movie_Category"
	},
	pv : {
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


movieSchema.pre("save",function(next){
	if(this.isNew){
		this.meta.createDate = this.meta.updateDate = Date.now();
	}else{
		this.meta.updateDate = Date.now();
	}
	next();
});

movieSchema.statics = {
	getAll : function(cb){
		return this.find({}).exec(cb);
	},
	getById : function(id, cb){
		return this.findById(id,function(err, obj){
				if(err){console.log(err);return;}
            	cb(obj);
            })
	},
	deleteById : function(id, cb){
		return this.findById(id,function(err, obj){
				if(err){console.log(err);return;}
            	obj.remove(function(){
            		console.log("删除成功");
            	});

            })
	},
	updatePv : function (id) {
		//console.log(id)
		this.update({_id :id},{$inc : {pv : 1}}, function () {})
	}
}


module.exports = movieSchema;