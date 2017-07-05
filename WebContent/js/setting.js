/* 系统-用户设置页面JavaScript代码 */
controlObj=JSON.parse(localStorage.getItem("control"));
$(".title-user").on("click",function(){
	$(this).next().slideToggle(500);
	$(".setting-system").slideUp(500);
});
$(".title-system").on("click",function(){
	$(this).next().slideToggle(500);
	$(".setting-user").slideUp(500);
});
var input=document.getElementsByTagName("input");
for(var i=0;i<input.length;i++){
	input[i].index=i;
	input[i].onkeypress=function(e){
		if(e.keyCode==13){
			if(this.index==2){
				document.getElementsByName("enter")[0].click();
				this.blur();
			}else{
				input[this.index+1].focus();
			}
		}
	}
}
$("[name='enter']").click(function(){
	var oldpw =$("[name='oldpw']").val();  
	var newpw =$("[name='newpw']").val(); 
	var againpw =$("[name='againpw']").val();
	var prts =  document.getElementById("meg");
	if(oldpw==""||oldpw==null){
	    prts.style.color="red";  
	    prts.textContent = "旧密码不能为空";
	    return;
	}  
	if(newpw==""||newpw==null){
	    prts.style.color="red";  
	    prts.textContent = "新密码不能为空";
	    return;
	}
	if(newpw!=againpw){
		prts.style.color="red";  
		prts.textContent = "重复密码不一致";
		$("[name='againpw']").val("");
		return;
	}
	$.ajax({
	    type:"post",
	    url:getRootPath()+"user/setting.do",
	    dataType:"json",
	    data:"oldpw="+oldpw+"&againpw="+againpw,
	    error:function(data){
	        confirm("请求失败，网络异常"+data);
	        console.log(data);
	    },
	    success:function(data){ 
	        var code = data.status; 
	        if(code == 200){
	        	$("#meg").val("");
	           confirm("密码修改成功");
	           window.sessionStorage.removeItem('user');
	           window.location.href ="index.html";
	        }else{
	            confirm("旧密码错误!!!"); 
	            $("[name='oldpw']").val("");
	            $("[name='newpw']").val("");
	            $("[name='againpw']").val("");
	       		 }
	    	}  
		});  
})

/* 按钮初始化 */
var znBt = $('.zn');
var jkBt = $('.jk');
var bjBt = $('.bj');
if(controlObj.zn==1){
	znBt.addClass("on");
}else{
	znBt.addClass("off");
}
if(controlObj.jk==1){
	jkBt.addClass("on");
}else{
	jkBt.addClass("off");
}
if(controlObj.bj==1){
	bjBt.addClass("on");
}else{
	bjBt.addClass("off");
}
/* 系统开关 */
znBt.on("click",function(){
	if(controlObj.zn==1){
		$(this).removeClass("on").addClass("off");
		controlObj.zn=0;
		localStorage.setItem('control',JSON.stringify(controlObj));
	}else{
		$(this).removeClass("off").addClass("on");
		controlObj.zn=1;
		localStorage.setItem('control',JSON.stringify(controlObj));
	}
});
jkBt.on("click",function(){
	if(controlObj.jk==1){
		$(this).removeClass("on").addClass("off");
		controlObj.jk=0;
		localStorage.setItem('control',JSON.stringify(controlObj));
	}else{
		$(this).removeClass("off").addClass("on");
		controlObj.jk=1;
		localStorage.setItem('control',JSON.stringify(controlObj));
	}
});
bjBt.on("click",function(){
	if(controlObj.bj==1){
		$(this).removeClass("on").addClass("off");
		controlObj.bj=0;
		localStorage.setItem('control',JSON.stringify(controlObj));
	}else{
		$(this).removeClass("off").addClass("on");
		controlObj.bj=1;
		localStorage.setItem('control',JSON.stringify(controlObj));
	}
});