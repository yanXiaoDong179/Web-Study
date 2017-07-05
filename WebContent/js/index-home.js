function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName + '/';
}
controlObj=JSON.parse(localStorage.getItem("control"));
var suoyin;
var suoyin_key;
var ssjk;
var goods_n=0;
function loading(){
	if(controlObj.jk==0){
		return false;
	}
	$.ajax({ //一个Ajax过程
		type: "post", //以post方式与后台沟通
		url :getRootPath()+"dateinfo/findData.do", //与此页面沟通
		dataType:'json',//返回的值以 JSON方式 解释
		success: function(data){//如果调用成功
			console.log("index-home请求成功");
			var jsonstring = JSON.stringify(data);
			var len = data.data_info.length-1; 
			newjson = JSON.parse(jsonstring);
			var $cond_1 = $(".condition-1").find(".cond-1");
			$cond_1.eq(0).text(data.data_info[len].tem);
			$cond_1.eq(1).text(data.data_info[len].hum);
			$cond_1.eq(2).text(data.data_info[len].light_int);
			$cond_1.eq(3).text(data.data_info[len].smoke);
			$cond_1.css('color','green');
			$cond_1.next().css('color','green');
		},
		error:function(){
			confirm("index-home页面，Ajax请求失败！");
		}
	});	
	settimehome = setTimeout(loading,2000);
}
/* 点击仓库后切换切面展示 */
$(".storage-1").on('click',function(){
	if($(this).innerWidth()>500){
		return false;
	}
	goods_n=0
	clearTimeout(settimehome);
	$(this).nextAll().fadeOut();
	$(this).stop(true,true).animate({width:"953px",height:"571px"},300,function(){
		$(".mini").eq(0).stop(true,true)
		.animate({height:"1px"},300,function(){
			$(".max").eq(0).fadeIn(300);
		});
	});
	getGoods();
	$(this).removeClass("hover");
});
/* 请求所有商品位置以及信息 */
function getGoods(){
	$.ajax({
		type:'post',
		url :getRootPath()+"commodity/location.do",
		dataType:'json',
		success:function(data){
			console.log(data);
			addGoods(data);
		},
		error:function(){
			confirm("获取商品信息失败！");
		}
	})
}
/* 描点函数 */
function addGoods(newdata){
	var goods_length=newdata.location.length;   //所有商品的数量
	if(goods_length==0){
		$(".canves").append("<span>还没有商品入库</span>");
		return false;
	}
	(function goodsRepeat(){
		var goods_location=newdata.location[goods_n].com_location;   //商品的位置
		var goods_number=newdata.location[goods_n].loc_cardid;  //商品的流水号
		var left=Math.round(Math.random()*174)+"px";  //X轴
		var top=Math.round(Math.random()*110)+"px";   //Y轴
		var color=goodsColor();	//颜色
		var goods_position="<i"+" "+"id='"+goods_number+"' "+"style='"+"top:"+top+";"+"left:"+left+";";
		//goods_position+="background-color:"+color+";";
		//goods_position+="box-shadow: 0 0 4px 4px"+color+";";
		goods_position+="'>"+"</i>";
		$("#"+goods_location).append(goods_position);
		goods_n++;
		if(goods_n<goods_length){
			setTimeout(goodsRepeat);
		}else{
			return false;
		}
	})();
	function goodsColor(){
		var colorArray=new Array("#00CC4F","#FFF119","#F93A00","#00E6E6","#CB00F1","#9F7CFF","#FD007E");
		var gdcolor=colorArray[Math.round(Math.random()*7)];
		return gdcolor;
	}

	/* 鼠标移上触发事件 */
	$(".canves").on('mouseenter','i',function(){
		var parent = this.parentNode;
		var pd=$(parent).position();
		var coord=$(this).position();
		var coordX=Math.floor(coord.left+pd.left);	//当前元素的横坐标
		var coordY=Math.floor(coord.top+pd.top+16);		//当前元素的纵坐标
		var goodsnum=$(this).attr("id");  //商品的流水号
		$(this).addClass("iActive");
		showMessage(coordX,coordY,goodsnum);
	})
	/* 鼠标移出 */
	$(".canves").on('mouseleave','i',function(){
		$(this).removeClass("iActive after before");
		$(".iMessage").hide();
	})
};
/* 商品信息展示 */
function showMessage(cx,cy,number){
	var messageX;		//信息栏的横坐标
	var messageY;		//信息栏的纵坐标
	var goodid=number.substring(0,8);
	var goodNumber=$(".iMessage").find("em").eq(0);
	var goodName=$(".iMessage").find("em").eq(1);
	var goodId=$(".iMessage").find("em").eq(2);
	var goodPrice=$(".iMessage").find("em").eq(3);
	var goodLife=$(".iMessage").find("em").eq(4);
	$.ajax({
		type:"post",
		dataType:"json",
		data:"comid="+goodid,
		url :getRootPath()+"commodity/findcom.do",
		success:function(data){
			console.log(data);
			$(goodNumber).text(number);
			$(goodName).text(data.commodity.com_name);
			$(goodId).text(goodid);
			$(goodPrice).text(data.commodity.price+"元");
			$(goodLife).text(data.commodity.warranty);
		},
		error:function(){
			confirm("获取商品信息失败！");
		}
	})
	if(cx>690){
		messageX=cx-190+"px";
	}else{
		messageX=cx-20+"px";
	}
	if(cy>410){
		messageY=cy-150+"px";
	}else{
		messageY=cy+10+"px";
	}
	$(".iMessage").css({
		"top":messageY,
		"left":messageX
	}).fadeIn(300);
}
/* 返回 */
$("#back").click(function(){
	loading();
	$(".canves").children().remove();
	$(".max").fadeOut(200);
	$(".storage-1").animate({width:"470px",height:"276px"},300,function(){
		$(".mini").eq(0).css("height","250px");
		$(".storage-1").nextAll().fadeIn(300);
	});
});

$(".storage-1").on({
	mouseover:function(){
		if($(this).innerWidth()>500){
			return false;
		}else{$(this).addClass("hover");}},
	mouseout:function(){$(this).removeClass("hover");}
});
$(".storage-2").on({
	click:function(){
		if($(this).find(".suspend").length>0){
			return false;
		}else{
			$(this).append("<div class='suspend'>暂未开发</div>")
		}
	},
	mouseenter:function(){$(this).addClass("hover")},
	mouseleave:function(){
		$(this).removeClass("hover");
		$(this).find(".suspend").remove();
	}
});
$(".storage-3").on({
	click:function(){
		if($(this).find(".suspend").length>0){
			return false;
		}else{
			$(this).append("<div class='suspend'>暂未开发</div>")
		}
	},
	mouseenter:function(){$(this).addClass("hover")},
	mouseleave:function(){
		$(this).removeClass("hover");
		$(this).find(".suspend").remove();
	}
});
$(".storage-4").on({
	click:function(){
		if($(this).find(".suspend").length>0){
			return false;
		}else{
			$(this).append("<div class='suspend'>暂未开发</div>")
		}
	},
	mouseenter:function(){$(this).addClass("hover")},
	mouseleave:function(){
		$(this).removeClass("hover");
		$(this).find(".suspend").remove();
	}
});
$().ready(function(){
	var cssl = $("link").length;
	/* css链接初始化 */
	/*for (var i = 0; i <cssl; i++) {
		(function(e){
			var csshref = $("link").eq(i).attr("href");
			csshref=csshref+"?v="+Math.floor(Math.random()*1000);
			$("link").eq(i).attr("href",csshref);
		})(i)
	}*/
	/* 监控开关 */
	loading();
});