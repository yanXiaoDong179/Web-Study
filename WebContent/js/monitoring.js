// 环境监控JavaScript
function getRootPath() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName
			.indexOf('/'));
	return window.location.protocol + '//' + window.location.host + '/'
			+ webName + '/';
	}
controlObj=JSON.parse(localStorage.getItem("control"));
var button_num = 1;
var change_tu = "";
var newjson="";
function repeat_make(){
	var json_length=0;
	$.ajax({ //一个Ajax过程
		async: false,	//同步请求方式
		type: "post", //以post方式与后台沟通
		url :getRootPath()+"dateinfo/findData.do", //与此页面沟通
		dataType:'json',//返回的值以 JSON方式 解释
		success: function(data){//如果调用成功
			console.log("监控页面初次请求成功");
			var jsonstring = JSON.stringify(data);
			newjson = JSON.parse(jsonstring);
			var oldlen=newjson.data_info.length-1;
			window.sessionStorage.setItem("oldid",newjson.data_info[oldlen].data_id);
		},
		error:function(){
			confirm("请求失败！");
		}
	});
	var arr_wd = new Array();
	var arr_sd = new Array();
	var arr_ld = new Array();
	var arr_yw = new Array();
	for(var i=0;i<newjson.data_info.length;i++){
		(function(e){
			arr_wd[e]=parseInt(newjson.data_info[json_length].tem);
			arr_sd[e]=parseInt(newjson.data_info[json_length].hum);
			arr_ld[e]=parseInt(newjson.data_info[json_length].light_int);
			arr_yw[e]=parseInt(newjson.data_info[json_length].smoke);
			json_length++;
		})(i)
	}
	chart = new Highcharts.Chart('container', {
		plotOptions : {
			series : {
				pointStart :Date.UTC(2017,11,14,0,0,0,0),// 开始值
				pointInterval : 1000	// 间隔一天
			}
		},
		credits : {
			enabled : false
		},
		chart : {
			// type:"column"
			type : change_tu
		// 指定图标类型，默认是折线图
		},
		title : {
			text : "仓库环境监控" // 图标标题
		},
		xAxis : {
			type: 'datetime',
	        dateTimeLabelFormats: {
	        	minute: '%H:%M',
	        }
		},
		yAxis : {
			title : {
				text : '数值' // 指定y轴的标题
			}
		},
		plotOptions : {
            line : {
                events : {
                    legendItemClick : function(event) {
                    	return false;
                    }
                }
            },
            column:{
                    events : {
                        legendItemClick : function(event) {
                        	return false;
                        }
                    }
            }
        },
		series : [ { // 指定数据列
			name : "温度", // 列名
			data : arr_wd
		// 数据
		}, {
			name : "湿度",
			data : arr_sd
		}, {
			name : "亮度",
			data : arr_ld
		}, {
			name : "烟雾",
			data : arr_yw
		} ]
	});
	if(controlObj.jk==0){
		return false;
	}
	var jk;
	function aja() {
		var myDate=new Date();
		var myTime=myDate.toLocaleString();
		$.ajax({ //一个Ajax过程
			async: false,	//同步请求方式
			type: "post", //以post方式与后台沟通
			url :getRootPath()+"dateinfo/findData.do", //与此页面沟通
			dataType:'json',//返回的值以 JSON方式 解释
			success: function(data){//如果调用成功
				var oldid = sessionStorage.getItem("oldid");
				NewJson = JSON.parse(JSON.stringify(data));
				jk=NewJson.data_info.length-1;
				if(oldid==NewJson.data_info[jk].data_id){
					console.log("数据库未更新！");
					return false;
				}else{
					sessionStorage.oldid=NewJson.data_info[jk].data_id;
					console.log("时时监控刷新成功");
					addjk();
				}
			},
			fail:function(){
				confirm("请求失败！");
			}
		});
		function addjk(){
			var add_wd = new Array(myTime,parseInt(NewJson.data_info[jk].tem));
			var add_sd = new Array(myTime,parseInt(NewJson.data_info[jk].hum));
			var add_ld = new Array(myTime,parseInt(NewJson.data_info[jk].light_int));
			var add_yw = new Array(myTime,parseInt(NewJson.data_info[jk].smoke));
			var delete_wd = chart.series[0];
			var delete_sd = chart.series[1];
			var delete_ld = chart.series[2];
			var delete_yw = chart.series[3];
			delete_wd = delete_wd.data.length > 14; // 当数据点数量超过 15个，则指定删除第一个点
			delete_sd = delete_sd.data.length > 14;
			delete_ld = delete_ld.data.length > 14;
			delete_yw = delete_yw.data.length > 14;
			// 新增点操作
			chart.series[0].addPoint(add_wd,true,delete_wd,false);
			chart.series[1].addPoint(add_sd,true,delete_sd,false);
			chart.series[2].addPoint(add_ld,true,delete_ld,false);
			chart.series[3].addPoint(add_yw,true,delete_yw,false);
		}
		/* 每1S刷新一次 */
		repeat=setTimeout(aja, 2000);
	}
	/* 页面加载2S后开始进行刷新 */
	setTimeout(aja,2000);
}
$().ready(repeat_make());

/* 时时监控开关 */
$('.button').click(function(){
	var that = this;
  setTimeout(function(){
  	if(button_num==1){
  		$(that).removeClass('on')
  		       .addClass('off')
  		       .addClass('moving');
  		setTimeout(function() {
  		  $(that).removeClass('moving');
  		}, 200);
  		clearTimeout(repeat);
  		button_num=0;
  	}else{
  		$(that).addClass('on')
  		       .removeClass('off')
  		       .addClass('moving');
  		setTimeout(function() {
  		  $(that).removeClass('moving');
  		}, 200)
  		repeat_make();
  		button_num=1;
  	}
  },500);
});

/* 切换数据显示方式 */
$("#change_tu").on("click",function(){
	confirm("点击触发");
	if($(this).attr("class")=="zxt"){
		change_tu = "column";
		clearTimeout(repeat);
		repeat_make();
		if($(".button").hasClass("off")){
			$(".button").removeClass('off')
				.addClass('on')
			  .addClass('moving');
			setTimeout(function() {
			  $(".button").removeClass('moving');
			}, 200)
			button_num=1;
		}
		$(this)
		.attr("class","zxtu")
		.attr("src","svg/zxtu.svg")
		.hide().fadeIn(300);
	}else{
		change_tu = "";
		clearTimeout(repeat);
		repeat_make();
		if($(".button").hasClass("off")){
			$(".button").removeClass('off')
				.addClass('on')
			  .addClass('moving');
			setTimeout(function() {
			  $(".button").removeClass('moving');
			}, 200)
			button_num=1;
		}
		$(this)
		.attr("class","zxt")
		.attr("src","svg/zxt.svg")
		.hide().fadeIn(300);
	}
});

/* 小菜单按钮 */
$(".monitoring-other img").on({
	click:function(){
		$(this).siblings().removeClass("other_img");
		$(this).addClass("other_img");
	}
});