var mongoDB = require("mongoose");
var userSchema = require("../schemas/user");
var user = mongoDB.model("User",userSchema);
module.exports = user;