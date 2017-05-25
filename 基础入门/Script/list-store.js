// 一些javaScript代码
		
		//构造一个名为init的函数
		function init(){

			//声明一个名为button的变量
			//document表示浏览器的整个页面
			//getElementById是一个方法
			//这里是getElementById方法的调用，它会找回“id”为“addButton”的元素，并返回这个元素
			//将元素赋值至一个名为button的变量
			var button = document.getElementById("addButton");
			//现在，getElementById所返回的元素已经赋值至button
			//我们可以直接进行引用了！
			//onclick是button的一个属性
			//把onclick的属性设置为我们想要调用的函数
			//调用handleButtonClick
			button.onclick=handleButtonClick;
			loadPlaylist();
		}
		//构造一个名为handleButtonClick的函数
		//这个之后会被引用
		function handleButtonClick(){
			//声明变量，赋值
			var textInput = document.getElementById("songTextInput");
			//声明变量，text.Input.value将获取用户输入的值，将输入值赋值至songName
			var songName = textInput.value;
			//document.createElement将创建一个新的元素。并返回新元素的引用
			//声明赋值
			var li = document.createElement("li");
			//变量li，将songName赋值给li
			li.innerHTML = songName;
			//使用getElementById得到id为"playList"的<ul>元素的一个引用
			var ul = document.getElementById("playList");
			//appendChile ：增加一个子元素
			//让<ul>元素增加一个<li>元素作为它的子元素
			//把li对象增加到ul
			ul.appendChild(li);

			save(songName);
			//判断songName是否为空
			// if(songName==""){
			// 	alert("Please enter a song!")
			// }
			// else{
			// 	alert("Adding " +songName);	
			// }
		}
		//等页面加载完后才会调用执行这个函数
		window.onload=init;