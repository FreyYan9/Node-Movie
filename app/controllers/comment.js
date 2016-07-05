var comment = require("../models/comment");

// comment.save 
exports.save = function(req, res){
	var _comment = req.body.comment;
	var movieId = _comment.movie;
	console.log(_comment);
	if(_comment.cid){
		comment.getById(_comment.cid,function(commObj){
			var reply = {
				to : _comment.tid,
				from : _comment.from,
				content : _comment.content,
			}
			commObj.reply.push(reply);
			commObj.save(function(err, obj){
				if(err){return console.log(err);}
				res.redirect("/movie/" + movieId);
			});
		});
	}else{
		var comm = new comment(_comment);
		comm.save(function(err, comment){
			if(err){return console.log(err);}
			res.redirect("/movie/" + movieId);
		});
	}	
}