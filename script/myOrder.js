/**
 * Created by Administrator on 2016/8/19.
 */
/**
 * Created by Administrator on 2016/8/16.
 */
var productDetail = {
    init:function () {
        this.productWidth();
        this.bindEvent();

    },
    productWidth:function () {

        if ($('#sale ul li').length == 0 ){
            $('#empty').show();
        } else{
            $('#empty').hide();
            var imgNum = $('.package-img').find("img").length ,
                imgW = $('.p-img').find("img")[0].width ,
                allImgW = imgNum * imgW + imgNum * 17 ;

            if(imgNum > 1){
                $(".package-img").css("width", allImgW);
            }

        }
    },
    bindEvent:function () {
        $('.order-cancel').on("tap",function () {
            show.popupTip('是否取消订单？','我再看看','确认取消',
                function () {
                },
                function () {
                });
        });
        $('.order-delete').on("tap",function () {
            show.popupTip('是否删除订单？','我再看看','确认删除',
                function () {
                },
                function () {
                });
        });
        $('.order-pay').on('tap',function(){
//      	window.location.href = 'pay.html'
        })
    }
}
$(function () {
    productDetail.init()
});

show.butColor('.order-pay','touchstart','#cc7300','#cccccc');
show.butColor('.order-pay','touchend','#ff9000','#ffffff');
show.butColor('.order-cancel','touchstart','#cccccc','#363636');
show.butColor('.order-cancel','touchend','#ffffff','#333333');
show.butColor('.order-deletel','touchstart','#cccccc','#363636');
show.butColor('.order-delete','touchend','#ffffff','#333333');
