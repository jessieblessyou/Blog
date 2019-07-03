const express=require('express');
const router=express.Router();
const categoryModel=require('../models/Category.js');
const articleModel=require('../models/Article.js');
const commentModel=require('../models/Comment.js');

var data='';
var page=1;
var limit=5;
var pages=0;
var count=0;
var buttonflag=0;

router.use(function(req,res,next){

	data={
		'userInfo': req.cookies.username,
		'limit':2,
	};

	categoryModel.find().then(function(doc){

		data.categories=doc;
	})

	next();
})


// router.use(function(req,res,next){

// 	commentModel.countDocuments().then(function(doc){

// 		pages=Math.ceil(doc/limit);

// 		count=doc;

// 		//console.log(pages);

// 	});

// 	next();
// })


router.get('/',function(req,res){

	//console.log(req.query.category);

	　data.page=Number(req.query.page|| 1);

	data.category=req.query.category ||'';		

	var findSet={};

	if(data.category!=''){

		findSet={
			category:data.category
		}
	};

	//console.log(findSet);		

	articleModel.find(findSet).countDocuments().then(function(count){

		data.pages=Math.ceil(count/data.limit);

		return articleModel.find(findSet).skip(data.limit*(data.page-1)).limit(data.limit).populate('author');

	}).then(function(doc){
		
		data.contents=doc;

		//console.log(doc[1].author);
		res.render('main/index',data);

	})

	
});




router.get('/view',function(req,res){

	//console.log(req.query.contentid);

	//console.log(data);

	articleModel.findOne({_id:req.query.contentid}).populate('author').populate('category').then(function(doc){

		data.content=doc;

		// data.category=doc.category._id;

		//console.log(doc);

		res.render('main/view',data);

	})

})


router.post('/comment',function(req,res){


	page=1;
	limit=5;
	pages=0;

		commentModel.find({article:req.body.articleId}).countDocuments().then(function(doc){

			count=doc;

			console.log(doc);

			return commentModel.find({article:req.body.articleId}).populate('user').limit(limit);

		}).then(function(doc){


			if(count<limit){

				data.buttonflag=buttonflag;
			};

			pages=Math.ceil(count/limit);

			//console.log(pages);

			data.comments=doc;

			res.send(data);
		});

});


router.post('/comment/prev',function(req,res){

	page=page-1;

	if(page<=1){

		data.buttonflag=buttonflag;
		page=1;
	}

	var articleId=req.body.articleId;

	var skip=limit*(page-1);



	//console.log(page, pages,skip,limit);

	commentModel.find({article:articleId}).skip(skip).limit(limit).populate('user').then(function(doc){

		data.doc=doc;

		res.send(data);
	})

})


router.post('/comment/Next',function(req,res){

	page=page+1;
	//res.json(page);

	if(page*limit>count){

		data.buttonflag=buttonflag;

		page=pages;
	}

	var articleId=req.body.articleId;

	var skip=limit*(page-1);

	commentModel.find({article:articleId}).skip(skip).limit(limit).populate('user').then(function(doc){

    //console.log(page,pages,skip,limit);
		
		data.doc=doc;

		res.send(data);
	})	


})




module.exports=router