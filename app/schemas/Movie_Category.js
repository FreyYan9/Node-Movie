var mongoDB = require("mongoose");
var Schema = mongoDB.Schema;
var ObjectId = Schema.Types.ObjectId;

var categorySchema = new Schema({
	name : String,
	movies : [{type:ObjectId, ref:"movie"}],
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


categorySchema.pre("save",function(next){
	if(this.isNew){
		this.meta.createDate = this.meta.updateDate = Date.now();
	}else{
		this.meta.updateDate = Date.now();
	}
	next();
});

categorySchema.statics = {
	//getAll : function(cb){
	//	this.find({},function(err, obj){
	//		cb(obj);
	//	})
	//},
	getAll : function () {
		return this.find({})
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
	}
}


module.exports = categorySchema;