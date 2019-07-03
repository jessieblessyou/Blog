const express=require('express');
const router=express.Router();
const categoryModel=require('../models/Category.js');
const userModel=require('../models/Users.js');
const articleModel=require('../models/Article.js');


var responseData={

	code:0,
	message:''
};

var selectedCategory='';

router.use(function(req,res,next){

	//console.log(req.cookies.username);

	if(!req.cookies.username || req.cookies.username.isAdmin==false) 
	{
		res.send('请用管理员身份登录');
		return;
	}else 
	{
		next();
	};

	
})

router.get('/',function(req,res){

	res.render('admin/index',{'userInfo':req.cookies.username});

	//res.send("good");
});

router.get('/user',function(req,res){

	userModel.find({}).countDocuments().then(function(data){

		//console.log(data);
		//console.log(req.query.page);

		var page=parseInt(req.query.page)||1;
		var limit=2;
		var displayPre="disabled";
		var displayNext="";

		if(page<1)
		{
			page=1;
			displayPre="disabled";
			displayNext="";

		}

		if(page>1)
		{
			var displayPre="";
			var displayNext="";
		}

		if(page*limit>=data)
		{
			page=Math.ceil(data/limit);
			displayPre="";
			displayNext="disabled";
		}

		var skip=(page-1)*limit;

		userModel.find({}).skip(skip).limit(limit).then(function(data){

			res.render('admin/user',{
				'userInfo':req.cookies.username, 
				'users':data,
				'page':page,
				displayPre:displayPre,
				displayNext:displayNext
			});
		});
	});

});


router.get('/category',function(req,res){

	categoryModel.find().sort({'_id':-1}).then(function(data){

		//console.log(data);
		res.render('admin/category',{

			'userInfo':req.cookies.username, 
			'categoryName':data
		});
	})

	
});


router.post('/category_add',function(req,res){

	//console.log(req.body.name);

	if(req.body.name==''){

		responseData.code=1;
		responseData.message='分类名称不能为空';
		res.json(responseData);
		return;
	}

	categoryModel.find({name:req.body.name}).then(function(data){

		//console.log(data);
		//console.log(data[0]);

		if(data[0]){

			//console.log(data.name);
			responseData.code=2;
			responseData.message='该名称已存在';
			res.json(responseData);
			return;
		}

		//console.log(data);


		var u=new categoryModel({
			name:req.body.name
		});

		u.save();

		responseData.code=0;
		responseData.message='添加成功';
		res.json(responseData);
		//res.redirect('/admin/category');
	})

});


router.post('/category_modify',function(req,res){

	console.log(req.body.modifyID);

	categoryModel.updateOne(
		{ _id: req.body.modifyID }, 
		{ name: req.body.newname }, function(err, res) {

});

	res.send("ok");
})


router.get('/category_delete',function(req,res){

	//console.log(req.query.id);

	categoryModel.deleteOne({_id:req.query.id},function(err){

		//console.log(err);

		res.redirect('/admin/category');
	})

	//res.send("ok");
})


router.get('/article',function(req,res){

	articleModel.find().populate('category').populate('author').then(function(data){


		categoryModel.find().then(function(data2){

			res.render('admin/article',{
			'userInfo':req.cookies.username, 
			'articlesInfo':data,
			'categoryName':data2
			});

		})



	})	
});

router.post('/article_save',function(req,res){

	//console.log(req.cookies.username.id);

	var u=new articleModel({

		category:req.body.category,
		title:req.body.title,
		author:req.cookies.username.id,
		description:req.body.description,
		content:req.body.content
	});


	u.save(function(err){

	});


	responseData.code=0;
	responseData.message='内容保存成功';
	res.json(responseData);
});



router.post('/article_edit',function(req,res){

	//console.log(req.body.id);

	articleModel.findOne({_id:req.body.id}).then(function(data){

		//console.log(data.content);
		res.json(data);
	})
})



router.post('/article_update',function(req,res){

	var data={
		title:req.body.title,
		description:req.body.description,
		content:req.body.content
	};

	articleModel.updateOne({_id:req.body.id},data,function(data){

		console.log(data);

		if(data==null){

			responseData.code=0;
			responseData.message='内容更新成功';
			res.json(responseData);
		}
	})

})

router.get('/article_delete',function(req,res){


	articleModel.deleteOne({_id:req.query.id},function(err){

		//console.log(err);

		res.redirect('/admin/article');
	})
})

module.exports=router