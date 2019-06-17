$(function(){
	//用户名验证
	var username = '';
	var passWord = '';
	$("#login .login-content .account input").on('input',function(){
		 username = $("#login .login-content .account input").val().trim();
		 passWord = $("#login .login-content .paword input").val();
		 $('#login .login-content .account input').css('border','solid 1px #e8e8e8');
		 $('#login .login-content .erinfo span').html('');
		 $('#login .login-content .erinfo i').hide();
	})
	
	$('#login .login-content .login input').click(function(){		
		var reg =/^1[34578]\d{9}$/;
		if(!reg.test(username)){
			$('#login .login-content .account input').css('border','solid 1px #fb6700');
			$('#login .login-content .erinfo i').css('display','inline-block');
			$('#login .login-content .erinfo span').html('用户名或密码不正确');
		}
		if(username.length == 0){
			$('#login .login-content .account input').css('border','solid 1px #fb6700');
			$('#login .login-content .erinfo i').css('display','inline-block');
			$('#login .login-content .erinfo span').html('用户名或密码不正确');;
		}
	});
	
	$('.login-bottom p a').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
