var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var blogSchema=new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref:'Users'
	},

	article:{
		type: Schema.Types.ObjectId,
		ref:'article'
	},
			
	addTime:{
		type:Date,
		default:new Date()
	},	
	
	content:{
		type:String,
		default:'',
	}
})

module.exports=blogSchema;