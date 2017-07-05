function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName + '/';
}
window.sessionStorage.setItem("oldcomlen",0);  //服务启动后的累计出库量
var commodity;				//时时出库商品信息
var comnum=0;					//请求的次数
var commoditylen=0;		//获取到的商品集合长度
var nowinto=0;				//本次启动系统后的出库数量
$().ready(function(){
	startService();
	setTimeout(startRfid,500);
})

/* RFID服务启动函数 */
function startService(){
	$.ajax({ //一个Ajax过程
		//async: false,	//同步请求方式
		type: "post", //以post方式与后台沟 通
		url :getRootPath()+"dateinfo/rfid.do", //与此页面沟通
		dataType:'json',
		data:"bool="+"false",
		success: function(data){
				console.log("rfid服务启动成功！");
		},
		fail:function(){
			confirm("Rfid服务启动失败！");
		}
	});
};
/* 时时检测是否有商品出库函数 */
function startRfid() {
	var myDate=new Date();
	var myTime=myDate.toLocaleString();
	$("#status-tackout").children().hide();
	$("#status-tackout").children().eq(1).show();
	$.ajax({ //一个Ajax过程
		
		type: "post", //以post方式与后台沟通
		url :getRootPath()+"dateinfo/data.do", //与此页面沟通
		dataType:'json',//返回的值以 JSON方式 解释
		//data:"bool="+"false",
		success: function(data){//如果调用成功
			commodity = JSON.parse(JSON.stringify(data));
			/* 第一次请求 */
			if(comnum==0){
				commoditylen=commodity.Commodity.length;
				sessionStorage.oldcomlen=commoditylen;
				console.log('初始化的出库数值:'+sessionStorage.getItem("oldcomlen"));
				console.log("RFID初次请求成功");
				console.log("初次请求返回的数据："+commodity);
				comnum=1;
				return false;
			}else{
				/* 获取上一次的length值 */
				/* 如果长度未变化 */
				var oldcomlen=sessionStorage.getItem("oldcomlen");
				if((oldcomlen==commodity.Commodity.length)||(commodity.Commodity.length==0)){
					console.log("没有商品出库");
					console.log("定时请求且未更新的数据："+commodity);
					return false;
				}else{
					//更改系统消息
					/* $("#status-tackout").children().hide();
					$("#status-tackout").children().eq(2).show(); */
					console.log("定时请求已更新的数据："+commodity);
					//更改商品信息界面
					outMessage();
				}
			}
		},
		error:function(){
			$("#status-tackout").children().hide();
			$("#status-tackout").children().eq(0).show();
			$(".record").find("img").remove();
			$(".record").append("<div><strong>资源获取失败...</strong></div>");
		}
	});
	/* 每5S刷新一次 */
	tackout=setTimeout(startRfid, 1000);
};
/* 有商品出库时调用函数 */
function outMessage(){
	nowinto++;
	console.log("出库成功");
	var comDate = new Date();
	var comTime = comDate.toLocaleString();
	var comlen = commodity.Commodity.length-1;
	var comid=document.getElementById("comid");
	var comname=document.getElementById("comname");
	var comnum=document.getElementById("comnum");
	var comtime=document.getElementById("comtime");
	var Commodityid=commodity.Commodity[comlen].cart_id;
	var Commodityname=commodity.Commodity[comlen].cart_id;
	var Commoditynum=commodity.Commodity[comlen].cart_id;
	var Commoditynumber=commodity.id[comlen];
	comid.firstChild.nodeValue=Commodityid;
	comname.firstChild.nodeValue=Commodityname;
	comnum.firstChild.nodeValue=Commoditynum;
	comtime.firstChild.nodeValue=comTime;
	/* 出库完成 */
	$("#status-tackout").children().hide();
	$("#status-tackout").children().eq(3).show();
	/* 刷新时时出库界面 */
	$(".record").find("img").remove();
	//传入时间和商品ID
	outRecord(comTime,Commoditynumber);
	/* 修改length */
	sessionStorage.oldcomlen=commodity.Commodity.length;
	console.log('当前出库总数值：'+sessionStorage.getItem("oldcomlen"));
	console.log('今日出库数：'+nowinto);
};
/* 时时出库记录请求完成调用函数 */
function outRecord(com_time,com_id){
	$("#record-tackout").find("sup").remove();
	var recordContent="<li style='display:none;'><em id='tackout-time'>";
	recordContent+=com_time;
	recordContent+="</em>&nbsp商品出库流水号：<em id='tackout-id'>";
	recordContent+=com_id;
	recordContent+="</em>&nbsp完成出库";
	$("#record-tackout").prepend(recordContent);
	$("#record-tackout").children().eq(0).show(300);
	$("#record-tackout").children().eq(0).append("<sup style='text-shadow:0 0 3px red;color:red;display:none;'>NEW</sup>");
	$("#record-tackout").find("sup").fadeIn(500);
	if($("#record-tackout").children().length>15){
		$("#record-tackout").children().eq(14).remove();
	}
};