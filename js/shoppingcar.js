$(function(){
	$('#footer').load('foot.html');
	var check = $('.list input');
	check.click(function(){
				//获取自己的状态  选中或者不选中
				var status = $(this).prop('checked');
				var checks = $('.content .checkbox input');
				//如果自己选中
				if(status){
					//让所有商品的选择按钮选中
					checks.prop('checked',true);
				}else{
					//让所有商品的选择按钮不选中
					checks.prop('checked',false);
 				}
				check.change();
				//触发商品前面的复选框
			});	
	function Goods(content){
		this.content = content;		
		this.increase = this.content.find('.increase');
		this.decrease = this.content.find('.decrease');
		this.input = this.content.find('.gamount input');
		this.amount = 1 ||this.content.find('.gamount input').val();
		this.gprice = this.content.find('.gprice b').html();
		this.del = this.content.find('.delete');
		
	}
	Goods.prototype = {
		constructor: Goods,
		init:function(){
			this.Increase();
			this.Decrease();
			this.Delete();
			this.Blur();
			this.input.val(1)
			
		},
		Increase:function(){
			var that = this;
			this.increase.click(function(){
				that.amount++;
				if(that.amount>=10){
					that.amount = 10
				}
				that.input.val(that.amount);
				that.content.find('.gtotal b').html(that.amount*that.gprice);
			})
		},
		Decrease:function(){
			var that = this;
			this.decrease.click(function(){
				that.amount--;
				if(that.amount<=1){
					that.amount = 1
				}
				that.input.val(that.amount);
				that.content.find('.gtotal b').html(that.amount*that.gprice);
			})
		},
		Delete:function(){
			var that = this;
			this.del.click(function(){
				if(confirm('确定删除宝贝吗？')){
					$(this).parent().parent().remove();
				}				
			})
		},
		Blur: function(){
			var that = this;
			this.input.blur(function(){
				that.amount = parseInt( that.input.val() )
				that.input.val(that.amount)
			})
		}
		
	}
	

//	console.log(total.eq(0).html());
//	for(var i = 0; i++;i<total.length){
//		totalprice = parseInt(total.eq(i).html());
//		totalPrice += totalprice;
//		console.log(totalprice);
//	}
// var goods0 = new Goods($('.content').eq(0));
// goods0.init();
// var goods1 = new Goods($('.content').eq(1));
// goods1.init();
// var goods2 = new Goods($('.content').eq(2));
// goods2.init();
// 
//	$.getJSON('js/data.json',function(data){
//		console.log(data)
//	})
//	
//	console.log(JSON.parse($.cookie('mi_cart')))
	var Cart = {
		data: null,
		cart: {},
		pay: {},
		totalnum:0,
		totalmoney:0,
		checkAll: $('.list input'),
		checks: $('.content .checkbox input'),
		cartCon: $('.goods'),
		init: function(){
			this.readCookie();
			this.remove();
			this.goodsSelect();
			this.increase();
			this.decrease();
			this.selectAll()
			var that = this;
			//读取商品数据（data.json）
			$.getJSON('js/data.json?key='+Math.random(),function(data){
				//console.log(data);
				//console.log(that.cart);
				that.data = data;
				//遍历cookie中的数据，放到页面上
				for(var key in that.cart){
					//利用闭包保留key值
					(function(k){
						var div = $('<div class="content clear"></div>');
						
						div.load('goodsInfo.html?key='+Math.random(),function(){
							//获取商品id
							var gid = that.cart[k]["goods-id"];
							var gtype = that.cart[k]["goods-type"];
							var gcolor = that.cart[k]["goods-color"];
							//console.log(gcolor)
							//商品名称
							var goodsname = that.data[gid]["goods-name"]
							//console.log(goodsname);
							var goodsprice = that.data[gid]["goods-price"]
							var goodstype = that.data[gid]["type"][gtype];
							var goodscolor = that.data[gid]["color"][gcolor];
							//console.log(goodscolor);
							var count = that.cart[k]["count"];
							var smallsum = count * goodsprice;
							that.totalnum++;
							that.totalmoney+=smallsum;
							//console.log(count)
							that.pay[k] = smallsum;
							//信息填充
							$('.aplay em').html(that.totalnum);
							$('.aplay i').html(that.totalmoney);
							div.find('.gcolor').html( goodscolor);
							div.find('.gprice').html(goodsprice);
							div.find('.gtotal').html(smallsum);
							div.find('.gname em').html(goodsname);
							div.find('.gname b').html(goodstype);
							div.find('.gamount input').val(count );
							
							div.attr({
								'data-onlyId':k,
								'data-price':goodsprice,
								'data-type':goodstype,
								'data-color':goodscolor,
								'data-count':count,
								"smallsum":smallsum
							})
							//追加到商品区
							that.cartCon.append(div);
						});
					})(key);
				}
			});
			
		},
		remove: function(){
			var that = this;
			this.cartCon.on('click','.delete',function(){
				if( confirm('确定删除宝贝吗？') ){
					//当前商品从页面消失
					$(this).parents('.content').remove();
					//从cookie中删除
					var onlyId = $(this).parents('.content').attr('data-onlyid');
					//删除  (复习delete)
					delete that.cart[onlyId];
					that.setCookie();
				}
			});
		},
		goodsSelect: function(){
			var that = this;
			this.cartCon.on('change','.checkbox input[type="checkbox"]',function(){
				var goodsItem = $(this).parents('.content');
				//获取商品id
				var onlyId = goodsItem.attr('data-onlyid');
				//总价
				var smallsum = goodsItem.attr('smallsum');
				//如果已经存在，再点击取消
				if(!goodsItem.find("input[type='checkbox']").prop("checked")){
					delete that.pay[onlyId];
					console.log(that.pay)
					console.log(smallsum);
				}else{
					that.pay[onlyId] = smallsum;
				}
				//判断是否需要选中或者撤销全选按钮的选中状态
				var allCheckBox = that.cartCon.find('input[type="checkbox"]');
				var allChecked = that.cartCon.find('input[type="checkbox"]:checked');
				//比较所有复选框的个数和被选中复选框的个数，如果相等，则全部被选中了
				if(allCheckBox.length == allChecked.length){
					//让全选按钮选中
					that.checkAll.prop('checked',true);
				}else{
					that.checkAll.prop('checked',false);
				}
				//处理页面
				that.handlePay();
			});
		},
		//全选
		selectAll: function(){
			$('.list input').click(function(){
				//获取自己的状态  选中或者不选中
				var status = $(this).prop('checked');
				var allCheckbox = $('.goods input[type="checkbox"]');
				//如果自己选中
				if(status){
					//让所有商品的选择按钮选中
					allCheckbox.prop('checked',true);
				}else{
					//让所有商品的选择按钮不选中
					allCheckbox.prop('checked',false);
				}
				//触发商品前面的复选框
				allCheckbox.change();
			});
		},
		handlePay: function(){
			var goodsAmount = $('.aplay em');
			var goodsMoney = $('.aplay i');
			var goPay = $('.aplay a');
			//遍历pay对象，获取件数和总价
			this.totalnum = 0;
			this.totalmoney = 0;
			for(var key in this.pay){
				this.totalnum++;
				this.totalmoney += parseFloat(this.pay[key]);
			}
			//处理结算按钮
			if(this.totalnum > 0){
				goPay.addClass('can-aplay');
			}else{
				goPay.removeClass('can-aplay');
			}
			console.log(this.totalnum)
			console.log(this.totalnum)
			console.log(this.pay)
			//给总价和总量重新赋值
			goodsAmount.html(this.totalnum);
			goodsMoney.html(this.totalmoney.toFixed(2));
		},
		//商品数量增加
		increase: function(){
			var that = this;
			//+点击
			this.cartCon.on("click",'.increase',function(){
				//input是自己的前一个兄弟
				var amount = $(this).prev().val();
				//获取商品id和库存
				var gid = $(this).parents('.content').attr('onlyid');
				amount++;
				if(amount>=10){
					amount = 10
				}
				$(this).prev().val(amount);
				//调用会写cookie功能
				that.handleCookie( $(this).prev() );
			});
		},
		//商品数量减少
		decrease: function(){
			var that = this;
			//+点击
			this.cartCon.on("click",'.decrease',function(){
				//input是自己的后一个兄弟
				var amount = $(this).next().val();
				amount--;
				if(amount<=1){
					amount = 1
				}
				$(this).next().val(amount);
				that.handleCookie( $(this).next() );
			});
		},
		handleCookie: function(input){
			var goodsItem = input.parents('.content');
			var onlyId = goodsItem.attr('data-onlyid');
			
			//处理总价
			var price = parseFloat(goodsItem.find('.gprice').html() );
			var totalMoneyBox = goodsItem.find('.gtotal');
			//重新显示单价商品总价
			this.totalmoney = ( parseInt(input.val()) * price );
			totalMoneyBox.html( this.totalmoney );
			
			//重新给cart中的数量赋值
			this.cart[onlyId].count = parseInt( input.val() );
			//回写cookie
			this.setCookie();
			
			//判断当前商品是否被选中
			if(goodsItem.find('input[type="checkbox"]').prop('checked')){
				//改变pay对象里面当前商品的总价
				this.pay[onlyId] = this.totalmoney;
				//调用结算商品信息方法
				this.handlePay();
			}
		},
		readCookie: function(){
			this.cart = $.cookie('mi_cart') || '{}';
			//解析
			this.cart = JSON.parse( this.cart );
		},
		setCookie: function(){
			$.cookie('mi_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		}
	}
	Cart.init();
	
	
	
	
	
	
	
	
	
	
	
	
})