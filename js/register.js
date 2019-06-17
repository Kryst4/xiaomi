$(function(){
	//手机号地区
	var phone = $('#register .register-content .phone p,#register .register-content .phone .phone-button');
	phone.click(function(){
		$('#register .register-content .phone .country').toggle();
	});
	$('#register .register-content .phone .country dl dd').click(function(){
		var span = $(this).find('span').html();
		var b  = $(this).find('b').html();
		$('#register .phone').find('p').html(b+'（'+span+'）');
		$('#register .register-content .phone .country').hide()
	});
	$(window).on('click',function(ev){
		if(!$(ev.target).is('.phone p,.phone .phone-button,.country dl dt')){
			$('#register .register-content .phone .country').hide();
		}	
	});
	//验证手机号
	var  phonenumber = '';
	$('#register .number input').on('input',function(){
		 phonenumber = $('#register .number input').val();
		 $('#register .info span').html('');
		 $('#register .info i').hide();
	});
	$('#register .number input').blur(function(){
		$('#register .number input').css('border','solid 1px #fb6700');
		var reg =/^1[34578]\d{9}$/;
		if(!reg.test(phonenumber)){
			$('#register .info i').css('display','inline-block');
			$('#register .info span').html('手机号码格式不正确');
		}
		if(phonenumber.length == 0){
			$('#register .info i').css('display','inline-block');
			$('#register .info span').html('请输入手机号码');
		}
	});
	//生成随机验证码
	$('#register .verifyCode').click(function(){
		var code = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var str = '';
		for(var i=0;i<4;i++){
			var j = parseInt(Math.random()*62);
			str += code[j]
		}
		$('#register .verifyCode').html(str);
	});
	
	//默认点击一下
	$('#register .verifyCode').trigger('click');
	
	//判断验证码是否一致
	var verifycode = '';
	$('#register .verify input').on('input',function(){
		 verifycode = $('#register .verify input').val();
		 $('#register .codeInfo span').html('');
		 $('#register .codeInfo i').hide();
	});
	$('#register .verify input').blur(function(){
		$('#register .verify input').css('border','solid 1px #fb6700');
		if(verifycode != $('#register .verifyCode').html()){
			$('#register .codeInfo i').css('display','inline-block');
			$('#register .codeInfo span').html('验证码不正确');
		}
		if(verifycode.length == 0){
			$('#register .codeInfo i').css('display','inline-block');
			$('#register .codeInfo span').html('请输入验证码');
		}
	});
	
	$('#register .register-bottom p a').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
	});
	
	
	
	
	
	
	
	
	
	
})
