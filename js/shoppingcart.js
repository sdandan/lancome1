require(['./config'],function () {
    require(['jquery','template','loadHF'],function ($,template) {

     class cart {
         constructor() {
             // 购物车数组
             this.cart = JSON.parse(localStorage.cart) || [];
             console.log(this.cart);
             this.initCart();
             this.subtotal();
             this.selectOnchange();
         //    this.removeHandler();
             this. addListener();
         }

         initCart() {
             // 如果购物车为空，则显示为空的提示信息
             if (this.cart.length === 0) {
                 alert("购物车空空如也");
                 return;
             }else {
                 const html = template("cart-template", {cart: this.cart});
                 $(".js-cart-content").html(html);

             }


         }

         subtotal(){
             console.log("33333");
             let unitCost = $(".js-unit-cost").text();  // 单价
             let goodNnm = $(".selectNum").val();    //  商品数量
             console.log(goodNnm);
             let val = unitCost.substr(1);
             console.log(val);
             let subtotalNum=parseFloat(val*goodNnm);
             $(".js-subtotal").text(subtotalNum);
         }

         //  修改商品数量处理
         selectOnchange(){
             let selects =$(".selectNum");
             for(let i=0;i<selects.length;i++){
                 $(selects[i]).change(function () {
                     console.log("dskfsjkfs ")
                   let num = $(selects[i]).val();
                    let unitCosts=$(this).parents(".js-shopcart-list").find(".js-unit-cost");
                     let val = unitCosts.substr(1);
                    //  console.log('我是单价',+val);
                    //  console.log($(selects[i]).val());
                     let subtotalNum=parseFloat(val*num);
                     $(".js-subtotal").text(subtotalNum);

                 })
             }

         }

         // 商品总价钱
         allCost(){
             let unitCosts = $(".js-unit-cost").text();
             let allCost = $(".js-subtotal");

         }

         addListener() {
             $(".js-remove").on("click",this.removeHandler());
             $(".js-nowResult").on("click",function () {
                 window.location.href="/html/closeAccount.html"
             });
             $(".js-nowResult1").on("click",function () {
                 window.location.href="/html/closeAccount.html"
             })
         }


           //  删除商品处理
         removeHandler(e){
             const _tr = $(this).parents(".js-shopcart-list");
           //  console.log(_tr);
             // 获取待删除行中商品的id
             const goodsId = _tr.data("id");
             console.log(goodsId);
             // 从购物车数组中删除该 id 对应的商品元素
             this.cart = this.cart.filter(curr => curr.id !=goodsId) // function(curr) {return curr.id != _id}
             // 从存储的结果中移除行所对应表示的商品
             localStorage.cart = JSON.stringify(this.cart);
             // 从DOM树中删除行
             _tr.remove()
         }

     }

      new cart();
     })

})