show.butColor('.order','touchstart','#cc7300','#cccccc');
show.butColor('.order','touchend','#ff9000','#ffffff');
show.butColor('.del','touchstart','#cccccc','#cc7300');
show.butColor('.del','touchend','#ffffff','#FF9000');
$('.del').on('tap',function(){
	show.popupTip('是否删除订单？','我再想想','确认删除', function () {alert(0);}, function () {
		alert('删除成功')
	});
})
$('.order').on('tap',function(){
//	window.location.href = 'pay.html'
})
var h=23;
var m=59;
var s=59;
if($('.text>div>p')[0].innerText === '等待付款'){
    setInterval("run()",1000);
}
function run(){
    --s;
    if(s<0){
        --m;
        s = 59;
    }
    if(m<0){
        --h;
        m = 59
    }
    if(h<0){
        s = 0;
        m = 0;
    }
    if(s<10){
        s = "0" + s
    }
    $('.time').html(h+"小时"+m+"分钟"+s+"秒");
}
