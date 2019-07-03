{
	let $category_name=$("#category_name");
	let $category_newName=$("#category_newName");

	let $category_submit=$("#category_submit");

	let $categoryInfo=$('#categoryInfo');

	let $category_modify=$("#category_modify");

	let $table=$('.table');

	let modifyID=''

	$table.find('a').click(function(){

		modifyID=$(this).parent().prev().prev().html();
	})


	$category_submit.click(function(){

		$.ajax({
			type:'POST',
			url:'category_add',
			data:{

				name:$category_name.val()
			},
			success: function(res){

				console.log(res);

				$categoryInfo.html(res.message);

				if(res.code==0){

					$categoryInfo.html('');
					window.location.reload();
				}

			}
		})
	})


	$category_modify.click(function(){

		$.ajax({
			type:"POST",
			url:'category_modify',
			data:{

				newname:$category_newName.val(),modifyID:modifyID
			},
			success:function(res){

				window.location.reload();
			}
		})
	})
	
}


{

	let $article_category=$("#article_category");
	let $article_title=$("#article_title");
	let $article_description=$("#article_description");
	let $article_content=$("#article_content");
	let $article_save=$("#article_save");
	let selectedCategory=$article_category.val();
	let $article_modify_link=$(".article_modify_link");
	let $article_selected_category=$("#article_selected_category");
	let $article_selected_title=$("#article_selected_title");
	let $article_selected_description=$("#article_selected_description");
	let $article_selected_content=$("#article_selected_content");
	let $article_update=$("#article_update");
	let modifyCategory='';

	$article_category.change(function(){

		selectedCategory=$article_category.find("option:selected").val();

		console.log(selectedCategory);	
		console.log($article_title.val());
		console.log($article_content.val());
	});

	$article_save.click(function(){

		$.ajax({

			type:'POST',
			url:'article_save',
			data:{
				category:selectedCategory,
				title:$article_title.val(),
				description:$article_description.val(),
				content:$article_content.val()
			},

			success:function(data){

				if(data.code==0){

					window.location.reload();

				}
			}
		})
	})

	$article_modify_link.click(function(){

		var x=$(this).parent().parent().find('td:nth-child(3)').html();
		var y=$(this).parent().parent().find('td:nth-child(1)').html();
		modifyCategory=y;

		$article_selected_category.children().each(function(){

			//console.log($(this).html());

			//console.log(x);

			if($(this).html()==x){

				$(this).attr("selected",'selected').siblings().removeAttr('selected');
			}
		});

		$.ajax({

			type:'POST',
			url:'article_edit',
			data:{id:y},
			success:function(data){

				//console.log(data);
				$article_selected_title.val(data.title);
				$article_selected_description.val(data.description);
				$article_selected_content.val(data.content);
			}
		})

	});


	$article_update.click(function(){

		$.ajax({
			type:'POST',
			url:'article_update',
			data:{
				id:modifyCategory,
				title:$article_selected_title.val(),
				description:$article_selected_description.val(),
				content:$article_selected_content.val()
			},
			success:function(data){

				if(data.code==0){

					window.location.reload();

				}
			}
		})

	})

}