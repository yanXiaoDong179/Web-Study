//登陆界面JS文件
var nav = "";

//通过登陆的用户类型跳转相应的界面
function Open(){

}
//禁止页面返回
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});