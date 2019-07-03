var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var blogSchema=new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref:'Categories'
	},
	
	title:String,
		
	author:{
		type: Schema.Types.ObjectId,
		ref:'Users'
	},
	
	addTime:{
		type:Date,
		default:new Date()
	},

	views:{
		type:Number,
		default:0
	},

	description:{
		type:String,
		default:''
	},	
	
	content:{
		type:String,
		default:'',
	}
})

module.exports=blogSchema;