$(function(){
	$('#footer').load('foot.html');
	$('#content .content-item').eq(0).show()
	$('#nav .nav li').on('click',function(){
		var i = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('#content .content-item').eq(i).show().siblings().hide();
	});
	//选择型号
	var choose =$('#content .content-item .content-item-info .type .version-1-item li');
	var suit = $('#content .content-item .content-item-info .type .suit .version-1-item li');
	var val1= $('.border').eq(0).text();
	var val2= $('.border').eq(1).text();
	var price = $('#content .title span').html();
	var val3;
	$('#content .content-item .content-item-info .choosedtype').html(val1+val2+'&nbsp;'+price+'</br>')	
	choose.on('click',function(){
		$(this).addClass('border').siblings().removeClass('border')		
		var val1= $('.border').eq(0).text();
		var val2= $('.border').eq(1).text();
		$('#content .content-item .content-item-info .choosedtype').html(val1+val2+'&nbsp;'+price+'</br>')
	})
	
	suit.on('click',function(){
		$(this).addClass('border').siblings().removeClass('border')
		val3= $('.border em').text();
		$('#content .content-item .content-item-info .type .suit .suit-item').show();
		$('#content .content-item .content-item-info .choosedtype').html(val1+val2+'&nbsp;'+price+'</br>'+val3);
	});
	var detail = {
		goodsid: $('#nav .nav .active a').attr('goods-id'),
		Li: $('#nav .nav li'),
		Buy: $('#content .content-item .content-item-info .buy'),
		goodstype:$('#content .phonetype').find('.border').attr('goods-type'),
		typeLi:$('#content .phonetype li'),
		goodscolor:$('#content ul.color').find('.border').attr('goods-color'),
		colorLi:$('#content .color li'),
		Buy: $('#content .content-item .content-item-info .buy'),
		data: {},
		count: 1,
		onlyId:0,
		init:function(){
			this.onlyId = this.goodsid+this.goodstype+this.goodscolor;
			console.log(this.goodsid);
			console.log(this.goodscolor);
			this.initData();
			this.Liclick();
			this.goodsType();
			this.goodsColor();
			this.buyClick();
		},
		initData:function(){
			var that = this;
			$.getJSON('js/data.json',function(data){
				that.data = data[that.goodsid]
				console.log(that.data);
				console.log(data);
				
			})
		},
		Liclick:function(){
			var that = this;
			that.Li.click(function(){
				that.goodsid = $(this).find('a').attr('goods-id');
				that.onlyId = that.goodsid+that.goodstype+that.goodscolor;
				console.log(that.goodsid)
			})
		},
		goodsType:function(){
			var that = this;
			that.typeLi.click(function(){
				that.goodstype = $(this).attr('goods-type');
				that.onlyId = that.goodsid+that.goodstype+that.goodscolor;
				console.log(that.goodstype)
			})
		},
		goodsColor:function(){
			var that = this;
			that.colorLi.click(function(){
			
				that.goodscolor = $(this).attr('goods-color');
				that.onlyId = that.goodsid+that.goodstype+that.goodscolor;
				console.log(that.goodscolor);
			})
		},
		buyClick:function(){
			
			var that = this;
			that.Buy.click(function(){
				alert('已加入购物车')
				var cart = $.cookie('mi_cart')||"{}";
				cart = JSON.parse(cart);
				if(cart[that.onlyId]){
					cart[that.onlyId].count ++;	
				}else{
					cart[that.onlyId] = {
						"goods-id":that.goodsid,
						"count":parseInt(that.count),
						"goods-type":that.goodstype,
						"goods-color":that.goodscolor
					}
				}
				$.cookie('mi_cart',JSON.stringify(cart),{expires:365,path:"/"});
				console.log(cart);
			})
		}
	}
	
	detail.init();
	
	
	
	
	
	
	
	
	
	
	
	
})