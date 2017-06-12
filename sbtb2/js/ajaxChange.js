//通过jQuery的Ajax异步处理技术，实现页面之间的调用

// 	/* Ajax异步处理 */
$("#nav li").on('click',function(e){
		/* 判断定时器是否已运行 */
	if(typeof repeat=="number"){
		clearTimeout(repeat);
	}
	if(typeof repeat_home=="number"){
		clearTimeout(repeat_home);
	}
	e.preventDefault();									//取消默认行为
	if($(this).hasClass('active')){
		return false;
	}
	$("#nav li.active").removeClass("active");
	$(this).addClass("active");
	var id=this.id;											//获取绑定事件的元素ID
	var that = "#"+id;
	if($(this).attr('url')){
		var url = $(this).attr('url');
	}else{
		return false;
	}
	var $content=$("#content");
		$("#cont").remove();						//移除cont元素的子元素及后代
			//jquery .load()方法加载HTML
		//$('#content').load(url).hide().fadeIn('slow');
			//jquery .ajax()方法加载HTML
		$.ajax({
			type:'POST',					//http请求方式
			url: url,							//目标资源的地址
			timeout:2000,					//事件失败前的等待时间
														//Ajax请求开始之前运行的函数
			beforeSend:function(){
				$content.append('<div id="load"><img id="rotate" src="svg/loading.svg" style="width:100px;"></div>');
			},
														//请求成功或失败后运行
			complete:function(){
				$('#load').remove();
			},
														//Ajax请求成功后运行的函数
			success:function(data){
				$content.append("<div id='cont'></div>");
				$("#cont").html(data).hide().fadeIn(300);
			},
														//Ajax请求失败后运行的函数
			fail:function(){
				alert("请求失败！");
			}
		});
});
$("#nav li:first-child").click();

	/* 加载过渡状态动画 */
var num = 0;
var rotate = setInterval(function(){
	num+=10;
	if(num>360){
		num=0;
	}
	$("#rotate").css("transform","rotate("+num+"deg)")
},50)
if(!$("#rotate").length>0){
	clearInterval(rotate);
}

	/* 创建本地存储用作测试 */
	//创建一个JSON对象
if(typeof localStorage.condition!="undefined"){
	console.log("yes");
	var storage=window.localStorage;
	//读取localStorage数据
	var json=localStorage.getItem("condition");
	//将json反序列化
	var condition=JSON.parse(json);
}else{
	console.log("no");
	var condition={
		sd:['16'],
		wd:['16'],
		yw:['16'],
		ld:['16']
	};
	//声明一个localStorage本地存储区域
	var storage=window.localStorage;
	//将json序列化
	db=JSON.stringify(condition);
	//在storage插入数据
	storage.setItem('condition',db);
	var goods={num:'0'};
	dbb=JSON.stringify(goods);
	storage.setItem('goods',dbb);
}


// function loading(){
// 	//读取localStorage数据
// 	var json=sessionStorage.getItem("condition");
// 	//将json反序列化
// 	var jsonObj=JSON.parse(json);
// 	var $cond_1 = $(".condition-1").find(".cond-1");
// 	$cond_1.eq(0).text(jsonObj.wd);
// 	$cond_1.eq(1).text(jsonObj.sd);
// 	$cond_1.eq(2).text(jsonObj.ld);
// 	$cond_1.eq(3).text(jsonObj.yw);
// 	if(parseInt($cond_1.eq(0).text())>38||parseInt($cond_1.eq(0).text())<0){
// 		$cond_1.eq(0).css('color','red');
// 		$cond_1.eq(0).next().css('color','red');
// 	}else{
// 		$cond_1.eq(0).css('color','green');
// 		$cond_1.eq(0).next().css('color','green');
// 	}
// 	$(".storage-1").on('click',function(){
// 		$(this).nextAll().remove();
// 		$(this).stop().animate({width:"960px",height:"578px"},500,function(){
// 			$(this).children()
// 				.animate({opacity:"0"},500)
// 		});
// 	});
// 	setTimeout(loading,500);
// }

	/* 测栏测试区 */
var $hand = $(".hand").find("input");
$("#aside-left").on('click',function(){
	//$("#aside-right").toggle(500);
	$hand.eq(0).val(condition.wd[condition.wd.length-1]);
	$hand.eq(1).val(condition.sd[condition.sd.length-1]);
	$hand.eq(2).val(condition.ld[condition.ld.length-1]);
	$hand.eq(3).val(condition.yw[condition.yw.length-1]);
	$("#aside-right").animate({
		width:'toggle'
	},500)
});
$(".hand input").on('click',function(){
	$(this).val('');
});
/* 手动修改环境参数 */
$("[name='hand']").click(function(){
	if(condition.wd.length>29){
				condition.wd.shift();
				condition.sd.shift();
				condition.ld.shift();
				condition.yw.shift();
				condition.wd.push($hand.eq(0).val());
				condition.sd.push($hand.eq(1).val());
				condition.ld.push($hand.eq(2).val());
				condition.yw.push($hand.eq(3).val());
			}else{
				condition.wd.push($hand.eq(0).val());
				condition.sd.push($hand.eq(1).val());
				condition.ld.push($hand.eq(2).val());
				condition.yw.push($hand.eq(3).val());
			};
	db=JSON.stringify(condition);
	storage.setItem('condition',db);
	// $("#aside-right").animate({
	// 	width:'toggle'
	// },500)
});
/* 自动随机修改环境参数 */
$("[name='intel']").click(function(){
	intel =setInterval(function(){
		var rand1 =Math.floor(Math.random()*100);
		var rand2 =Math.floor(Math.random()*100);
		var rand3 =Math.floor(Math.random()*100);
		var rand4 =Math.floor(Math.random()*100);
		$hand.eq(0).val(rand1);
		$hand.eq(1).val(rand2);
		$hand.eq(2).val(rand3);
		$hand.eq(3).val(rand4);
		if(condition.wd.length>29){
			condition.wd.shift();
			condition.sd.shift();
			condition.ld.shift();
			condition.yw.shift();
			condition.wd.push($hand.eq(0).val());
			condition.sd.push($hand.eq(1).val());
			condition.ld.push($hand.eq(2).val());
			condition.yw.push($hand.eq(3).val());
		}else{
			condition.wd.push($hand.eq(0).val());
			condition.sd.push($hand.eq(1).val());
			condition.ld.push($hand.eq(2).val());
			condition.yw.push($hand.eq(3).val());
		}
		db=JSON.stringify(condition);
		storage.setItem('condition',db);
	},1500)
});
/* 暂停自动修改 */
$("[name='stop']").click(function(){
	clearInterval(intel);
})
/*DOM加载完就开始进行数据刷新*/
// document.addEventListener('DOMContentLoaded',loading());
