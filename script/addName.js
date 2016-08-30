var productDetail = {
    init:function () {
        this.butC();
        this.leaveImg();
        this.foucs()
    },
	leaveImg:function(){
			$('.leave-img')[0].onclick = function () {
			$('.user-name')[0].value = '';			
			$($('.leave-img')[0]).addClass('hidden');
			productDetail.butC();
			$('.button-end').css({
				'background':'rgb(204, 204, 204)',
				'color':'#ffffff'
			})
		}
		$('.leave-img')[1].onclick = function () {
			$('.user-tel')[0].value = '';			
			$($('.leave-img')[1]).addClass('hidden');
			productDetail.butC();
			$('.button-end').css({
				'background':'rgb(204, 204, 204)',
				'color':'#ffffff'
			})
		}
	},
	butC:function(){
			var userName = $('.user-name').attr('value'),
				uesrTel  = $('.user-tel').attr('value');
				userName = userName.replace(/\s+/g,"");
				uesrTel  = uesrTel.replace(/\s+/g,"");
			if(userName !== '' && uesrTel !== ''){
				$('#navbar-title').html('编辑收货人');
				$('.button-end').css({
					    'background':'#ff9000',
					    'color':'#ffffff'
				})
				show.butColor('.button-end','touchstart','#cc7300','#cccccc');
				show.butColor('.button-end','touchend','#ff9000','#ffffff');
		}
	},	
	foucs:function(){
        $(".inform-input input").on('keyup',function(){
        	show.butColor('.leave-img','touchstart','#ffffff','#fe9000');
			show.butColor('.leave-img','touchend','#ffffff','#999999');
			$(".leave-img").addClass('hidden');
        	if($(this).val()){
        		$(this).siblings().removeClass('hidden');      		
        	}      	
        })
         $(".inform-input input").on('tap',function(){
         	$(".leave-img").addClass('hidden');
         })
	}
}

$(function () {
    productDetail.init()
});




