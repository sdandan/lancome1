require(['./config'],function () {
    require(['jquery','loadHF'],function ($) {

$(function () {
    var saveAddressBtn = $(".js-saveAddressBtn");
    $(".js-new-address").on("click",function () {
        $(this).attr("checked","checked");
           $(".js-newAddress").show("slow");
    })
    $(".js-cancel").on("click",function () {
        $(".js-newAddress").hide("slow");
        $(".js-new-address").attr("checked","");
    })
    saveAddressBtn.on("click",function () {
        let userName =$(".js-userName").val();  // 用户姓名
        let city=$(".js-city").val();  // 省份城市地区
        let detailAddress=$(".js-detailAddress").val();  // 详细地址
        let tellNumber=$(".js-tellNumber").val();  // 用户手机
        let phoneNumber=$(".js-phoneNumber").val();  // 固定电话
        let postcode=$(".js-postcode").val();  // 邮编
        if(userName==""||userName==undefined){
            alert("姓名不能为空");
            return;
        }else if(city==""||city==undefined){
            alert("省份城市不能为空");
            return;
        }else if(detailAddress==""||detailAddress==undefined){
            alert("详细地址不能为空");
            return;
        }else if(tellNumber==""||tellNumber==undefined){
            alert("手机号不能为空");
            return;
        }else if(postcode==""||postcode==undefined){
            alert("邮编不能为空");
            return;
        }else {
            $(".js-name").text(userName);
            $(".js-site").text(`${city}${detailAddress}`);
            $(".js-postcode1").text(postcode);
            $(".js-tel").text(tellNumber);
            var information={
                "userName":userName,
                "city":city,
                "detailAddress":detailAddress,
                "tellNumber":tellNumber,
                "postcode":postcode
            }
            localStorage.setItem("addressMsg",JSON.stringify(information));
            $(".js-newAddress").hide("slow");
            $(".js-new-address").attr("checked","");
        }


    })

})


    })
})