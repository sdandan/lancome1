require(['./config'], function () {
    require(['jquery','swiper','template','loadHF'], function ($,Swiper,template) {

        $(function () {

            function inint() {
                slideshow();
            }
            inint();

            function slideshow(){    // 轮播图
            let imgs = $(".js-banner-img>li");
            let tittles = $(".js-banner-tittle>li");
            let pinkTittles = $(".js-pinkLove>li");
            let banner = $(".js-banner");
            var sw = 0;
            var timer = null;

            autoPlay();
            tittles.on("click", function () {
                $(this).addClass("is-active").siblings('li').removeClass("is-active");
                sw = $(this).index();
                for (let i = 0; i < imgs.length; i++) {
                    if (i === sw) {
                        $(imgs[i]).show().siblings().hide();
                    }

                }
            });

            pinkTittles.on("click",function(){

            })
            function autoPlay(){
                timer = setInterval(function () {
                    sw++;
                    if(sw == tittles.length){sw=0}
                    tittles.eq(sw).trigger("click");
                },2000);

            }

                banner.mouseover(function () {
                clearInterval(timer);
            })
                banner.mouseout(function () {
                autoPlay();
            })

            }

            //  登录注册显示隐藏

                let loginRegisterBtn=$(".js-loginRegister");
                $(".js-login-close").on("click",()=>{
                    $(".js-login-box").hide();
                })
                $(".js-login").on("click",()=>{
                    $(".js-login-content").show();
                    $(".js-registration-screen").hide();
                })
                loginRegisterBtn.on("click",()=>{
                    console.log('2222');
                    $(".js-login-box").show();
                })
                $(".js-register-btn").on("click",()=>{
                    $(".js-registration-screen").show();
                    $(".js-login-content").hide();

                })

                $(".js-shopping-bag").on("click",function () {
                    console.log("3333333");
                    window.location.href="html/shoppingcart.html"
                });

            //  显示商品购买和详情按钮
            function commodityRender(){

                let purchaseImg =$(".js-swiper-slide");  // 商品div
                let purchaseDetails =$(".js-purchase-details"); // 显示购买了解详情按钮
                let buyPageDetail = $(".js-buy-page");   // 购买界面
                let buyNowBtn = $(".js-buyNow");   // 立即购买按钮
                let imgContent ="";
                    purchaseImg.mouseover(function () {
                       imgIndex = $(purchaseImg).index($(this));
                        purchaseDetails.eq(imgIndex).show();
                    });
                purchaseImg.mouseout(function () {
                    purchaseDetails.hide()
                });

                buyNowBtn.on("click",function () {   // 渲染商品购买详情
                    let goodsId = $(this).attr("id");
                    $(buyPageDetail).show();
                    const url=`http://www.xiongmaoyouxuan.com/api/detail?id=${goodsId}`;
                    $.getJSON(url,function (success) {
                        let details=success.data.detail;
                        let imgBox=$(".js-bye-imgs1"); // 商品购买图片div
                        let photo=details.photo;
                        let photos=details.photos;
                        var imgs;
                        console.log(details);
                          $(".js-tcPrice").html('￥'+details.bottomPrice);
                          $(".js-Price").html('￥'+details.bottomPrice);
                          $(".js-detail-tittle").html(details.title);
                          $(".js-detail-tittle").attr("id",details.commodityId);

                          for (let i=0;i<photo.length-2;i++){
                              for (let j=0;j<photos.length-2;j++){
                                  imgs=`<img src="${photo[i].url}" alt="" id="${photos[j].url}">`;
                              }
                              imgContent +=imgs;
                          }
                        imgBox.html(imgContent);
                        imgContent='';
                        goodsImg();
                         // 添加购物车
                        $(".js-Add-shopping-bags").on("click",function () {
                            addGoods();
                        })

                        // 立即购买跳转购物车页面
                        $(".js-buyGoods").on("click",function () {
                            addGoods();
                            window.location.href="/html/shoppingcart.html"
                        })
                    })

                })

            }
            function goodsImg(){
                let imgBtn=$(".js-bye-imgs1>img");  // 点击切换商品详情
                let imgBig=$(".js-bigImg");        // 显示大图
                console.log();
                let thisImgSrc=$(imgBtn[0]).attr("src");
                imgBig.attr("src",thisImgSrc);
                imgBtn.on("click",function () {
                    let thisImg=$(this).attr("src");
                    imgBig.attr("src",thisImg);
                    $(this).addClass("active-borderImg").siblings('img').removeClass("active-borderImg");
                })
            }

            // 点击添加购物车
       function addGoods() {
           //  判断是否缓存购物车商品的数组
           let cart = JSON.parse(localStorage.getItem("cart")) || [];
           let goodDetails={};
           let imgBtn=$(".js-bye-imgs1>img");  // 点击切换商品详情
           goodDetails.tittle=$(".js-detail-tittle").text();
           goodDetails.Price=$(".js-Price").text();
           goodDetails.goodNum=parseInt($("#select").val());
           goodDetails.goodImg=$(imgBtn[0]).attr("src");
           goodDetails.id=$(".js-detail-tittle").attr("id");

           const has = cart.some(prod => prod.id ==  goodDetails.id);
           if(has){
               cart = cart.map(prod => {
                   if ( prod.id== goodDetails.id)
                       prod.goodNum += parseInt(goodDetails.goodNum);
                   return prod;
               })
           }else {
               cart.push(goodDetails);
           }

           localStorage.setItem("cart", JSON.stringify(cart));
           alert("添加购物袋成功");
       }


      class buyPage{
                constructor(){
                    this.initProductList();
                    this.colsePage();
                }
          initProductList(){   // 渲染商品列表
              const url = "http://www.xiongmaoyouxuan.com/api/tab/2?id=13736259";
              $.getJSON(url,function (succeed) {
                  const list=succeed.data.items.list;
                  const data= {products:list};
                  const htmlContent=template('list-template',data);
                  $(".js-prod-list").html(htmlContent);
                  commodityRender();
              })

          }
          colsePage(){   // 购买界面关闭做操作
                    $(".js-close-buyPage").on("click",function () {
                        $(".js-buy-page").hide();
                    })
                }

            }
            new buyPage();

            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 4,
                spaceBetween:0,
                slidesPerGroup: 4,
                loop: true,
                loopFillGroupWithBlank: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        })


    })

})




