var mongoose=require('mongoose');
var userSchema=require('../schemas/article.js');

module.exports=mongoose.model('articles',userSchema,'article');