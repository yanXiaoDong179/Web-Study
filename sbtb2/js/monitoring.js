// 环境监控JavaScript
	var button_num = 1;
	var change_tu = "";
	function repeat_make(){
			//读取localStorage数据
		var json=localStorage.getItem("condition");
			//将json反序列化
		var jsonObj=JSON.parse(json);
		var jsonLength=jsonObj.wd.length;
		var json_length=jsonObj.wd.length-14;
		var arr_wd = new Array();
		var arr_sd = new Array();
		var arr_ld = new Array();
		var arr_yw = new Array();
		for(var i=0;i<14;i++){
			(function(e){
				arr_wd[e]=parseInt(jsonObj.wd[json_length]);
				arr_sd[e]=parseInt(jsonObj.sd[json_length]);
				arr_ld[e]=parseInt(jsonObj.ld[json_length]);
				arr_yw[e]=parseInt(jsonObj.yw[json_length]);
				json_length++;
			})(i)
		}

	  chart = new Highcharts.Chart('container',{
	  	credits: {
	  	  enabled: false
	  	},
			chart:{
				//type:"column"
				type:change_tu								//指定图标类型，默认是折线图
			},
			title:{
				text:"仓库环境监控"			//图标标题
			},
			xAxis: {
	      tickPixelInterval: 100,
	      type: 'datetime',  
	    },
	    yAxis: {
	        title: {
	            text:'数值'                //指定y轴的标题
	        }
	    },
			series:[{																	//指定数据列
				name:"温度",												//列名
				data:arr_wd														//数据
			},{
				name:"湿度",
				data:arr_sd
			},{
				name:"亮度",
				data:arr_ld
			},{
				name:"烟雾",
				data:arr_yw
			}]
		});
		function aja() {
			var myDate=new Date();
			var myTime=myDate.toLocaleString();
			var json=localStorage.getItem("condition");
			var jsonObj=JSON.parse(json);
			var add_wd = new Array(myTime,parseInt(jsonObj.wd[jsonObj.wd.length-1]));
			var add_sd = new Array(myTime,parseInt(jsonObj.sd[jsonObj.sd.length-1]));
			var add_ld = new Array(myTime,parseInt(jsonObj.ld[jsonObj.ld.length-1]));
			var add_yw = new Array(myTime,parseInt(jsonObj.yw[jsonObj.yw.length-1]));
	    var delete_wd = chart.series[0];
	    var delete_sd = chart.series[1];
	    var delete_ld = chart.series[2];
	    var delete_yw = chart.series[3];
	    delete_wd = delete_wd.data.length > 15; // 当数据点数量超过 15个，则指定删除第一个点
	    delete_sd = delete_sd.data.length > 15;
	    delete_ld = delete_ld.data.length > 15;
	    delete_yw = delete_yw.data.length > 15;
	    // 新增点操作
	    chart.series[0].addPoint(add_wd,true,delete_wd,false);
	    chart.series[1].addPoint(add_sd,true,delete_sd,false);
	    chart.series[2].addPoint(add_ld,true,delete_ld,false);
	    chart.series[3].addPoint(add_yw,true,delete_yw,false);
	    // 一秒后继续调用本函数
	    repeat=setTimeout(aja, 2000);
		}
		setTimeout(aja,2000);
	}
	$().ready(repeat_make());
	$('.button').click(function(){
	  var toggle = this;
	  if(button_num==1){
	  	$(toggle).removeClass('on')
	  	       .addClass('off')
	  	       .addClass('moving');
	  	setTimeout(function() {
	  	  $(toggle).removeClass('moving');
	  	}, 200);
	  	clearTimeout(repeat);
	  	button_num=0;
	  }else{
	  	$(toggle).addClass('on')
	  	       .removeClass('off')
	  	       .addClass('moving');
	  	setTimeout(function() {
	  	  $(toggle).removeClass('moving');
	  	}, 200)
	  	repeat_make();
	  	button_num=1;
	  }
	});
	$("#change_tu").on("click",function(){
		if($(this).attr("class")=="zxt"){
			change_tu = "column";
			clearTimeout(repeat);
			repeat_make();
			if($(".button").hasClass("off")){
				$(".button").addClass('on')
				  .removeClass('off')
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
				$(".button").addClass('on')
				  .removeClass('off')
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
	})