var mongoDB = require("mongoose");
var commentSchema = require("../schemas/comment");
var comment = mongoDB.model("comment",commentSchema);
module.exports = comment;