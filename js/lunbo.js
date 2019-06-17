//淡入淡出轮播
function Box(container) {
	this.container1 = container;
	this.left = this.container1.find('.left');
	this.right = this.container1.find('.right');
	this.imgs = this.container1.find('.wrapper img');
	this.circles = this.container1.find('.circle-item');
	this.now = 0;
	this.next = 0;
	this.timer = null;
	this.interval = 1400;
}
Box.prototype = {
	constructor: Box,
	init: function() {
		this.imgs.eq(0).show();
		this.autoPlay();
		this.hover();
		this.leftClick();
		this.rightClick();
		this.circleClick();
	},
	autoPlay: function() {
		var that = this;
		this.timer = setInterval(function() {
			that.next++;
			that.imgSwitch();
		}, this.interval)

	},
	hover: function() {
		var that = this;
		this.container1.hover(function() {
			clearInterval(that.timer);
		}, function() {
			that.autoPlay();
		})
	},
	leftClick: function() {
		var that = this;
		this.left.click(function() {
			that.next--;
			that.imgSwitch();
		})
	},
	rightClick: function() {
		var that = this;
		this.right.click(function() {
			that.next++;
			that.imgSwitch();
		})
	},
	circleClick: function() {
		var that = this;
		this.circles.click(function() {
			that.next = $(this).index();
			that.imgSwitch();
		})
	},
	imgSwitch: function() {
		if (this.next >= this.imgs.length) {
			this.next = 0;
		}
		if (this.next < 0) {
			this.next = this.imgs.length - 1;
		}
		this.imgs.eq(this.now).fadeOut(1000);
		this.imgs.eq(this.next).fadeIn(1000);
		this.circles.eq(this.next).siblings().removeClass('current1');
		this.circles.eq(this.next).addClass('current1');
		this.now = this.next;
	}
}
//hover 浮起
function Content(content) {
	this.content = content;
	this.leftImg = this.content.find('.main-one-l img');
	this.rightLi = this.content.find('.main-one-r ul li');
}
Content.prototype = {
	constructor: Content,
	init: function() {
		this.leftHover();
		this.rightHover();
	},
	leftHover: function() {
		var that = this;
		that.leftImg.hover(function() {
			$(this).animate({
				top: -3
			});
			$(this).css('box-shadow', '0 15px 20px #e0e0e0');
		}, function() {
			$(this).stop(true).animate({
				top: 0
			});
			$(this).css('box-shadow', 'none');
		});
	},
	rightHover: function() {
		var that = this;
		that.rightLi.hover(function() {
			$(this).animate({
				top: -3
			},600);
			$(this).css('box-shadow', '0 15px 20px #e0e0e0');
		}, function() {
			$(this).stop(true).animate({
				top: 0
			},600);
			$(this).css('box-shadow', 'none');
		});
	}
};

//内容区浮起点击轮播
function Container(container){
		this.container = container;
		this.leftBtn = this.container.find('.left');
		this.rightBtn = this.container.find('.right');
		this.circleItem = this.container.find('.circle-item');
		this.Wrapper = this.container.find('.wrapper');
		this.length = this.container.find('.wrapper li').length;
		this.index = 0;
	}
	Container.prototype = {
		constructor: Container,
		init:function(){
			this.leftClick();
			this.rightClick();
			this.hover();
		},
		imgSwitch:function(){
			
			if(this.index < 0){
					this.index = 0;
					return;
				};
			if(this.index > this.length-1){
				this.index = this.length-1;
					return;
				};
				this.circleItem.eq(this.index).addClass('current').siblings().removeClass('current')
				this.Wrapper.stop(true).animate({
					left:-300*this.index
			})
		},
		leftClick:function(){
			var that = this;
			this.leftBtn.click(function(){
				that.index--;
				that.imgSwitch();
			})	
		},
		rightClick:function(){
			var that = this;
			this.rightBtn.click(function(){
				that.index++;
				that.imgSwitch();
			})	
		},
		hover:function(){
			this.container.hover(function(){
				$(this).animate({
					top: -3
				});
				$(this).css('box-shadow', '0 15px 20px #e0e0e0');
			},function(){
				$(this).stop(true).animate({
					top: 0
				});
				$(this).css('box-shadow', 'none');
			})
		}
	}