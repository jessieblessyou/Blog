const express=require('express');
const router=express.Router();
const userModel=require('../models/Users.js');
const commentModel=require('../models/Comment.js');

var responseData={

	code:0,
	message:''
}

router.get('/api',function(req,res){

	res.send('api');
});

/*
	1. 用户名不能为空
	2. 密码不能为空
	3. 两次密码要一致
*/
router.post('/user/register',function(req,res){

	//res.send(req.body);

	let username=req.body.username;
	let password=req.body.password;
	let repassword=req.body.repassword;

	//console.log(req.body);

	if(!username){

		responseData.code=1;
		responseData.message='用户名不能为空';
		res.json(responseData);

		return;
	};

	if(!password || !repassword){

		responseData.code=2;
		responseData.message='密码不能为空';
		res.json(responseData);

		return;
	};


	if(password != repassword){

		responseData.code=3;
		responseData.message='两次密码输入不一致';
		res.json(responseData);

		return;
	};


	userModel.find({
		username:username,
	}).then(function(err){

		//console.log(err);

		if(err!='')
		{
			responseData.code=4;
			responseData.message='用户名已存在';
			res.json(responseData);

			return;	
		}

		var u=new userModel({
			username: username,
            password:password
		});

		u.save();

		responseData.code=0;
		responseData.message='注册成功';
		res.json(responseData);

	})

	
});


router.post('/user/login',function(req,res){

	let username=req.body.username;
	let password=req.body.password;


	if(password=='' || username=='')
	{
		responseData.code=5;
		responseData.message='用户或密码不能为空';
		res.json(responseData);
		return;
	}

	userModel.find({
		username:username,
	}).then(function(err){

		if(err=='')
		{
			responseData.code=6;
			responseData.message='用户不存在或密码错误';
			res.json(responseData);
			return;
		}
		
		//console.log(err[0]);
		
		if(err[0].username!=username || err[0].password!=password){

			responseData.code=7;
			responseData.message='用户或密码错误';
			res.json(responseData);
			return;
		}

		
		responseData.code=0;
		responseData.message='登录成功';
		res.cookie('username',　{'id':err[0]._id,'name':err[0].username,'isAdmin':err[0].isAdmin});
		res.json(responseData);	

	})
});


router.get('/user/logout',function(req,res){

	res.clearCookie('username');

	res.send("done");

});



router.post('/user/comment',function(req,res){

	//console.log(req.body);

	var html="";

	var u=new commentModel({

		user:req.cookies.username.id,
		article:req.body.articleId,
		content:req.body.content
	});

	u.save(function(){

		commentModel.find({article:req.body.articleId}).populate('user').then(function(doc){
				
			responseData.code=0;
			responseData.message=doc;
			res.json(responseData);
		})

	});
})





module.exports=router