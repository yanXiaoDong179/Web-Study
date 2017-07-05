//通过jQuery的Ajax异步处理技术，实现页面之间的调用
function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName + '/';
}
// 	/* Ajax异步处理 */
$("#nav li").on('click',function postData(e){
	/* 判断定时器是否已运行 */
	if(typeof repeat=="number"){
		clearTimeout(repeat);
		console.log("监控页面刷新暂停成功");
	};
	if(typeof settimehome=="number"){
		console.log("index-home暂停成功");
		clearTimeout(settimehome);
	};
	if(typeof startService_into != "undefined"){
		clearTimeout(into);
		$.ajax({ 
			//async: false,	//同步请求方式
			type: "post",
			url :getRootPath()+"dateinfo/remove.do",
			dataType:'json',
			success: function(data){
				console.log("入库RFID服务关闭成功！");
			},
			error:function(){
				confirm("入库RFID服务关闭失败！");
			}
		});
	}else{
		console.log("入库RFID启动服务还未启动");
	};
	if(typeof startService != "undefined"){
		clearTimeout(tackout);
		$.ajax({ 
			//async: false,	//同步请求方式
			type: "post",
			url :getRootPath()+"dateinfo/remove.do",
			dataType:'json',
			success: function(data){
				console.log("出库RFID服务关闭成功！");
			},
			error:function(){
				confirm("出库Rfid服务关闭失败！");
			}
		});
	}else{
		console.log("出库RFID启动服务还未启动");
	};
	//取消默认行为
	e.preventDefault();
	/* 获取当前元素的索引值并传给session */
	var nowIndex=$(this).index();
	console.log("当前点击的元素索引为："+nowIndex);
	sessionStorage.setItem("click",nowIndex)
	/* 添加活动css样式 */
	if($(this).hasClass('active')){
		return false;
	}
	$("#nav li").removeClass("active");
	$(this).addClass("active");
	/* 获取被点击元素的索引值 */
	/* Ajax异步加载 */
	if($(this).attr('url')){
		var url = getRootPath()+$(this).attr('url');
		console.log(url);
	}else{
		return false;
	}
	var $content=$("#content");
		$("#cont").remove();						//移除cont元素的子元素及后代
		$.ajax({
			type:'POST',					//http请求方式
			url: url,							//目标资源的地址
			timeout:2000,					//事件失败前的等待时间
														//Ajax请求开始之前运行的函数
			beforeSend:function(){
				$content.append('<div id="load"><img id="rotate" src="img/loading.gif" style="width:100px;"></div>');
			},
														//请求成功或失败后运行
			complete:function(){
				$('#load').remove();
			},
														//Ajax请求成功后运行的函数
			success:function(data){
				$content.append("<div id='cont' style='display:none'></div>");
				$("#cont").html(data).fadeIn(300);
			},
														//Ajax请求失败后运行的函数
			error:function(){
				$content.append('<div><p>页面请求失败!</p></div>');
			}
		});
});
function createSession(){
	var controlObj;
	if(typeof localStorage.control!="undefined"){
		console.log("有这个本地存储空间");
	}else{
		console.log("正在创建本地存储");
		var control={
			zn:1,
			jk:1,
			bj:1
		};
		//声明一个localStorage本地存储区域
		var storage=window.localStorage;
		//将json序列化
		db=JSON.stringify(control);
		//在storage插入数据
		storage.setItem('control',db);
	};
	if(typeof sessionStorage.click!="undefined"){
		console.log("session创建成功！");
	}else{
		var session = window.sessionStorage;
		session.setItem("click",0);
	}
	$("#nav li").eq(sessionStorage.getItem("click")).click();
}
/*DOM加载完就执行*/
document.addEventListener('DOMContentLoaded',function(){
	var CopyrightDate=(new Date).getFullYear();
	document.getElementById("CopyrightDate").firstChild.nodeValue=CopyrightDate;
	document.getElementById("home-user").firstChild.nodeValue=window.sessionStorage.getItem('user');
	if(window.sessionStorage.getItem('user')==null){
		$("#nav li").off("click");
		var error="<div class='nologin'>"
		error+="<strong>"+"您还未登录，"+"请先登录！"+"</strong>";
		error+="<button type='button'>"+"点击登录"+"</button>";
		error+="</div>";
		$("#cont").append(error);
		$(".nologin button").on('click',function(){
			window.location.href ="index.html";
		})
		return false;
	}else{
		createSession();
	}
});
