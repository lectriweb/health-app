var mongoose= require("mongoose");
var applicationSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  sex: String,
  height:String,
  familysickness: String,
  bloodtype: String,
  bloodgroup:String,
  created: {type:Date, default:Date.now},
  anumber:String,
  caddress:String,
  otherno:String,
  apostalcode:String,
  typeEmer:String,
  disabilities:String,
  message:String,

});
module.exports= mongoose.model("application", applicationSchema);