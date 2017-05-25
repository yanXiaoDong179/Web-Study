function vicenav(){
	var ul = document.getElementById("mainNav");
	var li = ul.getElementsByTagName("a");
	for(var i=0;i<li.length;i++){
		li[i].onclick = function(){
			Transmit(this);
		}
	}
}
function Transmit(on){
	var val = on.childNodes[0].nodeValue;
	var hre = on.getAttribute("name")+"?";
	window.location.href=hre+"txt="+encodeURI(val);
}
window.onload=vicenav;
var loc = location.href;
var n1 = loc.length;//地址的总长度
var n2 = loc.indexOf("=");//取得=号的位置
var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
var rooml = document.getElementById("roomLoca");
var txt1 = rooml.innerHTML;
var openl = document.getElementById("openLoca");
var txt2 = openl.innerHTML;
var roomc = document.getElementById("roomCheck");
var txt3 = roomc.innerHTML;
var openc = document.getElementById("openCheck");
var txt4 = openc.innerHTML;
function nav(obj,eventobj){
	$(obj).click(function(){
		$(this).addClass('onfocus');
		$(this).siblings().removeClass('onfocus');
		$(eventobj).show();
		$(eventobj).siblings().hide();
		if(obj==".nav1"){
			$("#roomLoca").click();
		}
		if(obj==".nav2"){
			$("#openLoca").click();
		}
	})
}
function mainNav(object){
	$(object).click(function(){
		$(".nav a").removeClass('on');
		$(this).addClass('on');
		if(object=="#roomLoca"){
			$(".nav1").click();
		}
		if(object=="#openLoca"){
			$(".nav2").click();
		}
	})
}
mainNav("#roomLoca");
mainNav("#openLoca");
mainNav("#roomCheck");
mainNav("#openCheck");
nav(".nav1","#table1");
nav(".nav2","#table2");
if(id==txt1){
	$("#roomLoca").click();
	$(".nav1").click();	
}
if(id==txt2){
	$("#openLoca").click();
	$(".nav2").click();
}
if(id==txt3){
	$("#roomCheck").click();
}
if(id==txt4){
	$("#openCheck").click();
}
$(function(){
    $("#navProject tr").click(function(){
        $("#navProject tr").removeClass("onfocus");
        $(this).addClass("onfocus");
    });
})
$(function(){
	$("#navProject tr td:first-child a").click(function(){
		window.open("check.html");
	});
})
