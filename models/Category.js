var mongoose=require('mongoose');
var userSchema=require('../schemas/category.js');

module.exports=mongoose.model('Categories',userSchema,'category');