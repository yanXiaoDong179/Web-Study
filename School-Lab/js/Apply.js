//申请表JS代码
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }
    else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function show(){
	var T = document.getElementById("time");
	H = document.getElementById("hour");
	//当ID为time的元素获取鼠标焦点时执行
	// T.onfocus=function(){
	//  	H.style.display="block";
	// }
	//当ID为time的元素失去鼠标焦点时执行
	// T.onblur=function(){
	// 	H.style.display="none";
	// }
	T.onclick=function close(){
		if(H.style.display=="block"){
	 		H.style.display="none";
	 	}
	 	else{
	 		H.style.display="block";
	 	}
	}
	// document.getElementsByTagName("body")[0].onclick=function(){
	// 	if(H.style.display=="block"){
	// 		H.style.display="none";
	// 	}
	// }
}
function change(eg){
	var egs = eg.getAttribute("class");
	var date= document.getElementsByClassName(egs)[0].innerHTML;
	var datetime = document.getElementById("time");
	datetime.setAttribute("value",date);
	H.style.display="none";
}
function gallery(){
	var pic = document.getElementById("hour");
	//遍历image元素中的所有a标签
	var links = pic.getElementsByTagName("li");
	for(var i=0;i<links.length;i++){
		links[i].onclick = function(){
			change(this);
		}
	}
}
   
addLoadEvent(show);
addLoadEvent(gallery);