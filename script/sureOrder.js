var blankStr = document.querySelector('.address').innerText;
var blankN = document.querySelector('.name').innerText;
blankStr = blankStr.replace(/\s+/g,"");   
blankN = blankN.replace(/\s+/g,"");

if(blankN !== '' && blankN.length !== 0){
    document.querySelectorAll('.particular-mes')[0].className = 'particular-mes';
    document.querySelectorAll('.chose')[0].className = 'hidden chose';
    document.querySelectorAll('.change')[0].className = 'change';
}
if(blankStr !== '' && blankStr.length !== 0){
    document.querySelectorAll('.particular-mes')[1].className = 'particular-mes';
    document.querySelectorAll('.chose')[1].className = 'hidden chose';
    document.querySelectorAll('.change')[1].className = 'change';
}
chose(0);
chose(1);
bgColor();

	$('.leave-img').on('tap',function(){
		$('.leave-message')[0].value = '';
	    $('.leave-img')[0].className = 'iconfont icon-icondeletedefault leave-img hidden'
	});


/****************************************
 *			   选择地址函数  			    *
 ****************************************/
function chose(num){
	if($('.chose').html() !== '选择'){
			$('.a-content')[num].addEventListener('tap',function(){
			$('.particular-mes')[num].className = 'particular-mes';
	        $('.chose')[num].className = 'hidden chose';
	        $('.change')[num].className = 'change';
	        bgColor()
			}) 
	}
}
/****************************************
 *			 底部按钮 颜色变化函数     			*
 ****************************************/
function bgColor(){
    if( document.querySelectorAll('.particular-mes')[0].className === 'particular-mes hidden' || 
    	document.querySelectorAll('.particular-mes')[1].className === 'particular-mes hidden')
    {
        document.querySelector('.order').style.background = '#cccccc';
        mobile('touchstart','#a3a3a3','#cccccc');
        mobile('touchend','#cccccc','#ffffff');
    } else{
        document.querySelector('.order').style.background = '#fe9000';
        mobile('touchstart','#cc7300','#cccccc');
        mobile('touchend','#fe9000','#ffffff');
    }
}
/****************************************
 *	   touchstart touchend 函数     			*
 ****************************************/
function mobile (event,bg,color){
    document.querySelector('.order').addEventListener(event,function(){
        this.style.background = bg;
        this.style.color = color;
    },false);
}
/****************************************
 *			 留言输入框    			*
 ****************************************/
function change (){
	show.butColor('.leave-img','touchstart','#ffffff','#fe9000');
	show.butColor('.leave-img','touchend','#ffffff','#999999');
    if(document.querySelector('.leave-message').value !== ''){
        document.querySelector('.leave-img').className = 'iconfont icon-icondeletedefault leave-img'
    }else {
        document.querySelector('.leave-img').className = 'iconfont icon-icondeletedefault leave-img hidden'
    }
}

//获取订单总金额
function totalFee(url,data){
    $.ajax({
        url:url,
        data:data,
        type:'post',
        dataType:'json',
        success:function(result){
            if(result.allPayment){
                $('.total-fee').html('￥'+result.allPayment);
            }
        }
    })
};

var url = $('.btnJump')[0].title;
$('.back').on('tap',function(){
	show.popupTip('确认离开本页？','我再想想','确认离开', function () {alert(0);}, function () {
		window.location.href = url;
		url = ''
	});
})
