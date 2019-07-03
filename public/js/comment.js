{
	var $messageBtn=$("#messageBtn");
	var $messageContent=$('#messageContent');
	var $contentId=$('#contentId');
	var $messageList=$('.messageList');

	var $commentPrev=$('#commentPrev');

	var $commentNext=$('#commentNext');

	var fortest=0;

	$.ajax({

		type:'POST',
		url:'comment',
		data:{
			articleId:$contentId.val()
		},
		success:function(data){

			$commentPrev.html('没有了');

			if(data.buttonflag==0){
				$commentNext.html('没有了');
			}

			renderComment(data.comments);
		}	
	})

	$messageBtn.click(function(){

		$.ajax({

			type:"POST",
			url:'api/user/comment',
			data:{
				content:$messageContent.val(),
				articleId:$contentId.val()
			},
			success:function(data){

				//console.log(data);

				if(data.code==0){
					
					//$messageList.html(data.message);	
					renderComment(data.message);
				}
			}
		})

	});


	$commentPrev.click(function(){

		$.ajax({
			type:'POST',
			url:'comment/Prev',
			data:{articleId:$contentId.val()},
			success:function(data){

				//console.log(data);

				console.log(data.buttonflag);

				if(data.buttonflag==0){

					$commentPrev.html('没有了');
					$commentNext.html('下一页');
					renderComment(data.doc);

					return;
				}

				$commentPrev.html('上一页');
				$commentNext.html('下一页');

				renderComment(data.doc);
			}
		})
	})



	$commentNext.click(function(){

		$.ajax({
			type:'POST',
			url:'comment/Next',
			data:{articleId:$contentId.val()},
			success:function(data){

				//console.log(data.doc);

				console.log(data.buttonflag);

				if(data.buttonflag==0){

					$commentNext.html('没有了');
					$commentPrev.html('上一页');
					renderComment(data.doc);

					return;
				}

				$commentPrev.html('上一页');
				$commentNext.html('下一页');
				
				renderComment(data.doc);
			}
		})
	})



	function renderComment(data){

		var html='';

		fortest=data[0].addTime;

		//console.log(fortest);

		for(var i=0; i<data.length;i++){

            html=html+'<div style="height:40px"><p style="height:10px"><span style="float:left;font-weight:bold;">'+data[i].user.username+'</span><span style="float:right">'+chinaTime(data[i].addTime)+'</span></p><p style="height:10px"><span style="float:left">'+data[i].content+'</span></p></div>';
		}

		//console.log(html);

		$messageList.html(html);
	};


	function chinaTime(addTime){

		if(addTime=='undefined'){
			return;
		}

		//console.log(addTime);

		var time=new Date(addTime);

		var showTime=time.getFullYear()+":"+(time.getMonth()+1)+":"+time.getDate()+":"+time.getHours()+":"+time.getMinutes()+':'+time.getSeconds();

		return showTime;
	}

}