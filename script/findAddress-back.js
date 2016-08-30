window['adaptive'].desinWidth = 1080;
window['adaptive'].baseFont = 18;
window['adaptive'].maxWidth = 480;
window['adaptive'].init();






/****************************************
 *          收货地址 单选切换           *
 ****************************************/
    // 存放属性



    //$(".inform-tab tr .inform-click").click(function(){
    $(".inform-tab").on("tap",".inform-click",function(){

        if($(this).parents("tr").find(".iconchoicedefault").hasClass("icon-iconchoicedefault")){
            var pars = $(this).children('p').attr('data-title');
            $("#inform-tab").attr("ram", pars);
            return ;
        }
        $(this).parents("tr").find(".iconchoicedefault").addClass("iconfont icon-iconchoicedefault").parents("tr")
        .siblings("tr").find(".iconchoicedefault").removeClass("iconfont icon-iconchoicedefault");

        $(this).parents("tr").find(".inform-selector").css("border","0px").parents("tr").siblings("tr").
        find(".inform-selector").css("border","0.05rem solid #cccccc;");

        $(this).parents("tr").find(".inform-td-icon").css("border","0px").parents("tr").siblings("tr").
        find(".inform-td-icon").css("border","0.05rem solid #cccccc;");

        //$('#inform-tab').
        $(".footer .footer-activeaddress-btn").css("background","rgb(255, 144, 0)");
    });


// 全局变量
var shop_id;

var windowHref =  window.location.href; //获取 url 正是用
//如果有shopid的参数
if(windowHref.indexOf("&shop_id=") > 0 ){
    shop_id = GetQueryString('shop_id');
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


/*console.log("当前的shop_id是-------"+shop_id);
*/
/************************************
 *          搜索框
 **********************************/
$('.navbar-seach').focus(function(){
    $(this).addClass("showing");
    if($(this).val()){
        /*console.log("Fdsffsd");*/
        $('.seach-deleIcon').show().css({'color':'#ccc'});
        $(".navbar-seachGoodlsAddr").css({width:"73%"});
        $('.ui-searchbar-cancel').html('搜索');
        $(".inform-List-box").show();
        $("#inform-tab").hide();
    }else{
        /*console.log("nonon");*/
        // $(".navbar-seachGoodlsAddr").css({width:"80%"});
        // 显示选择地址
        $("#inform-tab").hide();
        $(".seach-deleIcon").hide();
        $(".inform-list").hide();
        $(".inform-List-box").show();
        $('.ui-searchbar-cancel').html('取消');
    }

});

var dataSeach ="";
$('.navbar-seach').keyup(function(){
    if(!$(this).val()){
        return;
    }
    $('.seach-deleIcon').show();
    $(".navbar-seachGoodlsAddr").css({width:"73%"});
    $('.seach-deleIcon').css({'color':'#ccc'});
    $('.ui-searchbar-cancel').html('搜索');

    if($('.navbar-seach').val() === "" || $('.navbar-seach').val() === null){
        alert("请输入搜索的内容");
        dataSeach = $('.navbar-seach').val();
        //console.log(dataSeach);
        $(".navbar-main").attr("data-seach",dataSeach);
    }


});

$(document).bind("tap",function(e){
    var target  = $(e.target);
    if(target.closest(".showing,navbar-link,.inform-show").length == 0){
        $(".inform-List-box").hide();
        $("#inform-tab").show();
        $('.seach-deleIcon').hide();
        $('.navbar-seach').removeClass("showing");
        $(".inform-list").show();
        $('.ui-searchbar-cancel').html('搜索');
    }
    e.stopPropagation();
});


$(".ui-searchbar-cancel").tap(function(){
    if($(this).html() != "搜索"){
        //读取 搜索记录
        return;
    }
    // 设置的方法
    // setCookie("history",$(".navbar-seach").val(),30);
   /* console.log("提交搜索的内容"+$(".navbar-seach").val());
    console.log("调用keyword方法");*/
    var data4 = getZitiinfo(4,$(".navbar-seach").val())
    getZitiinfoEach(data4);
    //$(".navbar-seach").val("");
    $(".navbar-seach").val(dataSeach);
});


$('.seach-deleIcon').on("touchstart", function(){
    $('.seach-deleIcon').css({'color':'green'});
});

$('.seach-deleIcon').on("touchend", function(){
    $('.navbar-seach').val('');
    //$(".inform-List-box").hide();
    $("#inform-tab").show();
    $(".inform-List-box").show();
    $(this).hide();
});

$('.ui-searchbar-cancel').on("touchstart", function(){
    $(".seach-deleIcon").css({'color':"#ccc"});
});
$('.ui-searchbar-cancel').on("end", function(){
    $(".seach-deleIcon").css({'color':"#00a53c"});
});

/************************************
 * 当键盘输入的时候显示商家地址
 **********************************/

$(".navbar-seach").keyup(function(){
    $(".inform-List-box").show();
});


$("#inform-list-type li").tap(function(){
    var index = $(this).index();
    switch(index)
    {
        case 0:
            var data1 = getZitiinfo(1);
            // alert("aa");
            // console.log("调用ship_id方法");
            $(".navbar-seach").val(dataSeach);
            getZitiinfoEach(data1);
            break;

        case 1:
            var data2 = getZitiinfo(2);
            // console.log("调用type方法");
            $(".navbar-seach").val(dataSeach);
            getZitiinfoEach(data2);
            break;

        case 2:
            var data3 = getZitiinfo(3);
            $(".navbar-seach").val(dataSeach);
            // console.log("调用store_id方法");
            getZitiinfoEach(data3);
            break;
    }
});


// 获取到的参数处理处理  obj  是后台返回的数据 (适用非搜索返回的结果)
function getZitiinfoEach(obj){
    $('#inform-tab tbody').html("")
    if(obj.success){
        var content = '';
        for(var i = 0; i < obj.message.length; i++){
            var cur = obj.message[i];
            content += "<tr>"+
                "     <td class='inform-click'>"+
                "        <span class='inform-td-icon'><i class='iconchoicedefault'></i></span>"+
                "     </td>"+
                "     <td class='inform-click'>"+
                "         <p class='inform-title' data-title='"+cur.ziti_addr_id+"'>"+cur.name+"</p>"+
                "         <p class='inform-add'><span class='inform-type'>"+cur.type+"</span><span class='inform-tel'>"+cur.tel+"</span></p>"+
                "     </td>"+
                " </tr>";
        }
        $('#inform-tab').show().html(content);

    }else if(obj.error){
        $('#inform-tab').show().html("<p class='windowText'>"+obj.message+"</p>");
    }
}

// 底部选择框取消后，按钮变成灰色
$(".foot-checkbox").on("tap", function(){
    $(".footer-btn").css({"background": "#cccccc"});

});


/************************************
 *  我已阅读并同意提货协议 选择按钮切换
 **********************************/
function btnColor(id){
    return document.querySelector(id);
}
var check = btnColor(".foot-checkbox");
var footerBtn  = btnColor(".footer-btn");
check.onclick = function(){
    if(check.checked == true){
        check.setAttribute("checked", true);
        footerBtn.style.background = "#ff9000";
        show.butColor(".footer-btn-orang","touchstart","rgb(211,112,0)","rgb(218,208,178)");
        show.butColor(".footer-btn-orang","touchend","#ff9000","#FFF");
    }else if(check.checked == true){
        check.removeAttribute("checked");
    }
};


/*****************************************************************
 *
 *   搜索内容 Ajax get
 *
 ****************************************************************/
var url = document.querySelector("#url").getAttribute("value");
function getZitiinfo(type,keyword){
    var data;
    if(type==1){
        data = {
            "shop_id" : shop_id
        }
    }else if(type ==2){
        data = {
            "shop_id" : shop_id,
            "store_id" : "Y"
        }
    }else if(type == 3){
        data = {
            "shop_id" : shop_id,
            "type" : "tiange"
        }
    }else{
        data = {
            "shop_id" : shop_id,
            "keyword" : keyword

        }
    }
    var servicedata;
    $.ajax({
        url : url,
        type : "post",
        dataType : "json",
        async : false,
        data : data,
        success : function(obj,m,s){
            servicedata = obj;
        },
        error :function(obj){
            console.log(obj);
        }
    });
    //返回 处理结果
    return servicedata;
}


// 发送请求提交带参数数跳转
var zitiAddrId = $(".inform-title").attr("data-title");
var returnUrl = $(".footer-btn").attr("href");
var myReg = /(\?|\&)/;
var shopReg = /(\&shop_id=)/;
var shopId;


$(".footer-btn").on("tap", function(){
    /*if(returnUrl.indexOf("&shop_id=") > 0 ){
        var shopVal = windowHref.split("&shop_id=")[1];
        if(shopVal){
            shopId = shopVal;
        }
    }*/

     if(shopReg.test(returnUrl)){
          shopId = returnUrl;
     }

    if(myReg.test(returnUrl)){
        //console.log("yes--有--去掉?");
        var getRam = document.querySelector("#inform-tab").getAttribute("ram");
        window.location.href=returnUrl+"&ziti_addr_id="+getRam;
    }else{
         //console.log("none--没有就加--?");
        var getRam = document.querySelector("#inform-tab").getAttribute("ram");
         window.location.href=returnUrl+"?ziti_addr_id="+getRam;
    }
});



// 弹出层
$(function(){
    $(".layer-close").on("tap",function(){
        $(".layer-infor").hide();
    });

    $(".agreement-inform").on("tap",function(){
        $(".layer-infor").show();
    });

    // $(".layer-infor").on("click",function(){
    //     $(".layer-infor").hide();
    // });

});


// 本地存储
function getLocalStorage(){
    function query(id){
        return document.querySelector(id);
    }
    var oSub = query(".ui-searchbar-cancel");   // 搜索按钮
    var oTxt = query(".navbar-seach");          // 搜索文本框架
    var oList = query(".inform-List");          // 显示记录内容区
    var del = query(".inform-List-del");        // 清除

    var cc = window.localStorage.getItem("objscc");
    console.log(cc);
    var ary = [];
    if(cc !== null){
        ary = cc.split(",");
    }else{
        ary = [];
    }
    oSub.onclick = function(){
        if(oTxt.value == null || oTxt.value == ""  || oTxt.value == "undefined"){
            return;
        }
        ary.push(oTxt.value);
        if(ary.length > 0 && ary.length === 5){
            ary.shift();
        }
        // 设置存储
        window.localStorage.setItem("objscc", ary);
    }
    // 删除存储
    del.onclick = function(){
        window.localStorage.clear();
        $(".inform-List").hide();
    }
    // 获取数据
    var getRage = window.localStorage.getItem("objscc");
    //console.log(getRage.length);
    // 截取key里面的数据
    if(getRage == null || getRage == "" || getRage == "undefined"){
        return;
    }else{
        var strAry = Array();
        var arySplit = getRage.split(",");
        for(var k = 0; k < arySplit.length; k++){
            console.log(arySplit[k]);
            var Li = document.createElement("li");
            Li.setAttribute("onclick","oHistory(this)");
            var oA = document.createElement("a");
            oA.setAttribute("href","javascript:void(0);");
            oA.innerHTML = arySplit[k];
            Li.appendChild(oA);
            oList.appendChild(Li);
        }
    }
}
getLocalStorage();
// 历史记录关键字赋值给搜索入口
function oHistory(obj){
    $(obj).children("a").text();
    var seachVal = document.querySelector(".navbar-seach");
    seachVal.value = $(obj).children("a").text();
}
