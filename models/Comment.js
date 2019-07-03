var mongoose=require('mongoose');
var userSchema=require('../schemas/comments.js');

module.exports=mongoose.model('Comments',userSchema,'comment');