var express=require("express");
var mongoose=require('mongoose');
var swig=require('swig');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var app=express();
const adminRouter=require('./routers/admin');
const apiRouter=require('./routers/api');
const mainRouter=require('./routers/main');
var categoryModel=require('./models/Category.js');


app.set('views','./views');
app.set('view engine','html');
app.engine('html',swig.renderFile);
swig.setDefaults({cache:false});


app.use('/public',express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/',mainRouter);
app.use('/admin',adminRouter);
app.use('/api',apiRouter);

app.use(function (req, res, next) {
  //console.log(req.cookies.username); // 第二次访问，输出chyingp
  next();
});



mongoose.connect('mongodb://localhost:27017/movie',{ useNewUrlParser: true},function(err){

	if(err)
	{
		console.log("wrong");
	}
	else{
		console.log("right");
		//app.listen(8000);
	}

});

// app.get('/',function(req,res){

// 	categoryModel.find().then(function(data){

// 		res.render('main/index',{'userInfo':req.cookies.username,'categories':data});

// 	})

	
// })


app.listen(8000);