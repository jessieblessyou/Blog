{
	let $registerBox=$('#registerBox');
	let $loginBox=$('#loginBox');
	let $userInfo=$('#userInfo');
	let $logout=$('#logout');



	$registerBox.find('a.colMint').click(function(){

		$loginBox.show();
		$registerBox.hide();

	});



	$loginBox.find('a.colMint').click(function(){

		$registerBox.show();
		$loginBox.hide();
	});


	$registerBox.find('button').click(function(){

		var x=$registerBox.find('[name="username"]').val();
		var y=$registerBox.find('[name="password"]').val();
		var z=$registerBox.find('[name="repassword"]').val();

		$.ajax({

			type:'POST',
			url: 'api/user/register',
			data:{
				username:x,password:y,repassword:z
			},
			success:function(data)
			{
				//console.log(data);
				$registerBox.find('.colWarning').html(data.message);

				if(data.code==0)
				{
					$registerBox.find('.colWarning').html(data.message);

					setTimeout(function(){

							$loginBox.show();
							$registerBox.hide();

					},1000)
				}
			}
		})

	});



	$loginBox.find('button').click(function(){

		var x=$loginBox.find('[name="username"]').val();
		var y=$loginBox.find('[name="password"]').val();

		$.ajax({

			type:'POST',
			url:'api/user/login',
			data:{
				username:x,password:y
			},
			success:function(data){

				console.log(data);

				$loginBox.find('.colWarning').html(data.message);

				if(data.code==0)
				{
					$loginBox.find('.colWarning').html(data.message);

					setTimeout(function(){

						$loginBox.hide();
						$userInfo.hide();
						window.location.reload();

					},1000)
				}
			}
		})

	});


	$logout.click(function(){

		console.log("a");

		$.ajax({

			type:'GET',
			url:'api/user/logout',
			success:function(data){

				if(data=='done'){
					window.location.reload();
				}
			}
		})
	})


}



