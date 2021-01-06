//购物车下拉菜单
// const topbarCar = document.querySelector('.topbar-cart')//获取第一个被
//找到的class为topbar-cart的标签、
// const loading = document.querySelector('.loading')
// const cartResult = document.querySelector('.cart-result')
// const cartMenu = document.querySelector('.cart-menu')

// let timer = null
// topbarCar.addEventListener('mouseenter',function(){
// 	//添加事件监听
// 	cartMenu.style.height='100px'
// 	loading.style.display='flex'
// 	timer = setTimeout(()=>{//延迟执行，箭头函数，在这里和普通函数没有区别
// 		loading.style.display = 'none'
// 		cartResult.style.display='block'
// 	},1000)
// })
// topbarCar.addEventListener('mouseleave',function(){
// 	//添加事件监听
// 	cartMenu.style.height='0px'
// 	loading.style.display='none'
// 	cartResult.style.display='none'
// 	clearTimeout(timer)//清除定时器
// })

//商品列表导航菜单下拉
const navList = document.querySelector('.nav-list')
const headerNabMenu = document.querySelector('.header-nav-menu')
function enterHandle(){
	headerNabMenu.style.height='229px'
	headerNabMenu.style.border='0px 0px 1px 0px solid #E0E0E0'
}
function leaveHandle(){
	headerNabMenu.style.height = '0px'
	headerNabMenu.style.borderTop = '0px 0px 1px 0px solid #E0E0E0'
}
navList.addEventListener('mouseenter',enterHandle)
navList.addEventListener('mouseleave',leaveHandle)
// headerNabMenu.addEventListener('mouseenter',enterHandle)
// headerNabMenu.addEventListener('mouseleave',leaveHandle)
const navItems = document.getElementsByClassName('nav-item')
const childrenLists = document.getElementsByClassName('childern-list')
for(let i =0;i<navItems.length;i++){
	navItems[i].addEventListener('mouseenter',function(){
		for(let j=0;j<childrenLists.length;j++){
			childrenLists[j].style.display='none'
			
		}
		document.querySelector(`.childern-list[title=${this.title}]`).style.display='block'
	})
}
$(function() { 
    // 获取电梯的高度
    var h = $('.lift').height();
	console.log(h)
    // 设置电梯的上外边距，实现垂直居中
    $('.lift').css('margin-top',-1 * h / 2);

    // 视口的高度
    var vpHeight = $(window).height();
    // 视口高度的一半
    var halfVpHeight = vpHeight/2;

    // 获取各个栏目相对于文档顶部的距离
    var floor1Top = $('.site-topbar').offset().top;
    var floor2Top = $('.banner-box').offset().top;
    var floor3Top = $('.page-main').offset().top;
    var floor4Top = $('.channel-floor').offset().top;
    var floor5Top = $('.huawei-computer').offset().top;
    var floor6Top = $('.footer-container').offset().top;

    // 为窗口添加滚动事件响应函数 
    // 声明事件响应函数
    function onScroll() {
    	// 滚动事件不断触发，就不断获取滚动条滚动过的距离
    	var st = $(this).scrollTop();

    	// 求出栏目与视口顶部之间的距离tx
    	var t1 = floor1Top - st;
    	var t2 = floor2Top - st;
    	var t3 = floor3Top - st;
    	var t4 = floor4Top - st;
    	var t5 = floor5Top - st;
    	var t6 = floor6Top - st;

    	// 滚动到一定距离就把电梯显示出来
    	if (t1 <= halfVpHeight) {
    		// 显示电梯，执行动画前，推荐先暂停所有正在执行的动画（stop方法）
    		$('.lift').stop().fadeIn(300);
    		$('.lift li').eq(0).addClass('curr').siblings().removeClass('curr');
    	}else {
    		$('.lift').stop().fadeOut(300);
    	}

    	if (t2 <= halfVpHeight) {
    		$('.lift li').eq(1).addClass('curr').siblings().removeClass('curr');
    	}
    	if (t3 <= halfVpHeight) {
    		$('.lift li').eq(2).addClass('curr').siblings().removeClass('curr');
    	}
    	if (t4 <= halfVpHeight) {
    		$('.lift li').eq(3).addClass('curr').siblings().removeClass('curr');
    	}
    	if (t5 <= halfVpHeight) {
    		$('.lift li').eq(4).addClass('curr').siblings().removeClass('curr');
    	}
    	if (t6 <= halfVpHeight) {
    		$('.lift li').eq(5).addClass('curr').siblings().removeClass('curr');
    	}
    }
    // onScroll函数结束

    // 为窗口添加滚动事件响应函数（前面声明的函数）
    $(window).scroll(onScroll);

	// 为电梯按钮添加单击事件响应函数 
	$('.lift li').click(function(event) {
		// 用off方法把滚动事件响应函数解绑
		$(window).off('scroll');

		// 被单击那个按钮（li）添加curr类，兄弟元素移除curr类
		$(this).addClass('curr').siblings().removeClass('curr');

		// 判断当前被单击的按钮是不是第一个li，如果是，那么通过动画滚屏
		if ($(this).index() === 0) {
			// 自定义动画，实现自动滚屏
			$('html,body').stop().animate({
				'scrollTop':floor1Top
			},800,function() {
				// 滚屏结束后，重新把滚动事件响应函数绑定
				$(window).scroll(onScroll);
			});
		}
		// 后面的若干if类似于上面的，是在判断其余楼层
		if ($(this).index() === 1) {
			$('html,body').stop().animate({
				'scrollTop':floor2Top
			},800,function() {
				$(window).scroll(onScroll);
			});
		}
		if ($(this).index() === 2) {
			$('html,body').stop().animate({
				'scrollTop':floor3Top
			},800,function() {
				$(window).scroll(onScroll);
			});
		}
		if ($(this).index() === 3) {
			$('html,body').stop().animate({
				'scrollTop':floor4Top
			},800,function() {
				$(window).scroll(onScroll);
			});
		}
		if ($(this).index() === 4) {
			$('html,body').stop().animate({
				'scrollTop':floor5Top
			},800,function() {
				$(window).scroll(onScroll);
			});
		}
		if ($(this).index() === 5) {
			$('html,body').stop().animate({
				'scrollTop':floor6Top
			},800,function() {
				$(window).scroll(onScroll);
			});
		}
		if ($(this).index() === 6) {
			$('html,body').stop().animate({
				'scrollTop':floor7Top
			},800,function() {
				$(window).scroll(onScroll);
			});
		}

	});

});
	
//搜索框
const searchText = document.querySelector('.search-bar-form input')
const searchBtn = document.querySelector('.button')
const searchHotWords = document.querySelector('.search-hot-words')
searchText.addEventListener('focus',function(){
//	输入框聚焦事件
	searchText.style.borderColor='#Ff6700'
	searchBtn.style.borderColor='#Ff6700'
	searchHotWords.style.display = 'block'
	
})
searchText.addEventListener('blur',function(){
	//	输入框失焦事件
	searchText.style.borderColor='#E0E0E0'
	searchBtn.style.borderColor='#E0E0E0'
	searchHotWords.style.display = 'none'
})
// lunbo
const bannerSwiper=new Swiper('.banner',{
	loop:true,//循环播放
	effect:'fade',
	autoplay:{
		//自动播放
		delay:1000
	},
	navigation:{
		prevEl:'.swiper-prev',
		nextEl:'.swiper-next'
	},
	pagination:{
		el:'.swiper-pagination',
		clickable:true
	}
})
const banner = document.querySelector('.banner')
banner.addEventListener('mouseenter',function(){
	bannerSwiper.autoplay.stop()
})
banner.addEventListener('mouseleave',function(){
	bannerSwiper.autoplay.start()
})
//倒计时
//console.log(new Date('2020/12/10 22:00:00'))
// function countDown(){
// 	let a = new Date('2020/12/10 22:00:00')-new Date()
// 	//console.log(a)
// 	let hour = Math.floor(a/(1000*60*60))//向下取整
// 	let minute = Math.floor((a%(1000*60*60))/(1000*60))
// 	let second = Math.floor(((a%(1000*60*60))%(1000*60))/1000)
// 	console.log(hour)
// 	console.log( minute)
// 	console.log( second)
// 	const hourEl = document.getElementById('hourEl')
// 	const minuteEl = document.getElementById('minuteEl')
// 	const secondEl = document.getElementById('secondEl')
// 	hourEl.innerHTML=hour<10?'0'+hour:hour
// 	minuteEl.innerHTML=minute<10?'0'+minute:minute
// 	secondEl.innerHTML=second<10?'0'+second:second	
// }
// countDown()
// setInterval(()=>{
// 	countDown()
// },1000)
//闪购轮播图
new Swiper('.flashsale-list',{
	slidesPerView:4,//可视区显示4个轮播位
	slidesPerGroup:4//滚动时4个为一组
})


ec.load("ec.slider", {
	loadType : "lazy",
	callback : function() { 
		$("#m-banner").slider({
			width: 1200, //　必须
			height: 120, //　必须
			style : 1, //　1显示分页，2只显示左右箭头,3两者都显示
			pause : 5000, 	//间隔时间
            auto : true
		});
	}
});
	
	
