document.addEventListener("DOMContentLoaded",function(){
	document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px';
	zigbeeload();
	setTimeout(repeatimg,5000);
});
window.onresize=function(){
	document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px';
};
function getRootPath() {
var pathName = window.location.pathname.substring(1);
var webName = pathName == '' ? '' : pathName.substring(0, pathName
		.indexOf('/'));
return window.location.protocol + '//' + window.location.host + '/'
		+ webName + '/';
}
function zigbeeload(){
	/* window.location.href =getRootPath()+"dateinfo/zigbee.do"; */
	$.ajax({ //一个Ajax过程
		type: "post",//以post方式与后台沟通
		url :getRootPath()+"dateinfo/zigbee.do", //与此页面沟通
		dataType:'json',//返回的值以 JSON方式 解释
		success: function(data){//如果调用成功
			if(data.status==200){
				console.log("监控页面初次请求成功");
			}
		},
		error:function(){
			confirm("zigbee启动失败！");
		}
	});
};
/* 登陸驗證 */
function log(){
	console.log("点击触发");
  var account =$("#username").val();  
  var pwd =$("#password").val();  
  var prts =  document.getElementById("meg");
  if(account==""||account==null){  
      prts.style.color="red";
      prts.textContent = "账号不能为空";
      $("#password").val("");
      return;
  }  
  if(pwd==""||pwd==null){  
      prts.style.color="red";  
      prts.textContent = "密码不能为空";  
      return;
  }  
  $.ajax({  
  	async:false,
      type:"post",
      url:getRootPath()+"user/login.do",
      dataType:"json",
      data:"name="+account+"&password="+pwd,	 
      error:function(data){  
        confirm("请求失败，网络异常"+data); 
        console.log(data);
      }, 
      success:function(data){  
        var code = data.status;
        if(code == 200){
        	console.log(data.name);
        	window.sessionStorage.setItem('user',data.name);
            window.location.href ="home.html";
        }else{
          prts.style.color="red";
          prts.innerHTML = "用户名或者密码错误"; 
          $("#username").val("");
          $("#password").val("");
       	}  
    	}
  });  
}; 
var messageNum=1;
var CopyrightDate=(new Date).getFullYear();
document.getElementById("CopyrightDate").firstChild.nodeValue=CopyrightDate;
function repeatimg(){
	var dele;
	var img_len=$(".main img").length;
	var img_width=$(".main img").eq(0).width();
	$("#messageTitle").hide(500);
	$("#messageContent").hide(500);
	$(".repeatimg li").eq(1).css({"margin-left":img_width+"px"});
	$(".repeatimg li").eq(0).animate({left:"-"+img_width},600,function(){
		dele=$(this).detach();
		dele.css({"left":"0","opacity":"0"});
		$(".repeatimg").append(dele);
		switch(messageNum)
		{
		case 0:
			$("#messageTitle").show(500).text("互联网与物品相交融");
			$("#messageContent").show(800).text("智慧地球就在这里");
			break;
		case 1:
			$("#messageTitle").show(500).text("智能轻便的操作");
			$("#messageContent").show(800).text("高效而又准确的实现");
			break;
		case 2:
			$("#messageTitle").show(500).text("更简单可视化数据");
			$("#messageContent").show(800).text("想知道和没想到的都在这里");
			break;
		case 3:
			$("#messageTitle").show(500).text("安全警报24H不中断");
			$("#messageContent").show(800).text("安全问题，扼杀于摇篮");
			break;
		case 4:
			$("#messageTitle").show(500).text("更多令人惊叹的体验");
			$("#messageContent").show(800).text("等你来开启");
			break;
		}
		messageNum++;
		if(messageNum>4){
			messageNum=0;
		}
	});
	$(".repeatimg li").eq(1).animate({"margin-left":0,"opacity":"1"},500);
	setTimeout(repeatimg,5000);
};
$(".enter").on("click",function(){
	$(this).hide(100);
	$("#messageTitle").css({"color":"#999"});
	$("#messageContent").css({"color":"#999"});
	$(".login").fadeIn(500);
	$(".login").find("input").eq(0).focus();
});
var input=document.getElementsByTagName("input");
for(var i=0;i<input.length;i++){
	input[i].index=i;
	input[i].onkeypress=function(e){
		if(e.keyCode==13){
			if(this.index==1){
				console.log(this.parentNode.lastChild);
				document.getElementById("enterGo").click();
				this.blur();
			}else{
				input[this.index+1].focus();
			}
		}
	}
};
$(".index-about").on({
	mouseenter:function(){
		var index_about="<div class='zhimei'>"+"<p>"+"团队名称：智美轻联"+"</p>";
		index_about+="<p>"+"成立时间：2017-6-06"+"</p>";
		index_about+="<p>"+"团队成员：吴正杰、鄢小冬、曾求志"+"</p>";
		index_about+="<p>"+"团队思想：充满激情，热爱学习，挑战自我，为实现智慧地球贡献自己的力量"+"</p>";
		index_about+="</div>";
		$(this).append(index_about);
	},
	mouseleave:function(){
		$(".zhimei").remove();
	}
});