// 定义模块加载头部尾部
define(['jquery'],function ($) {
    class LoadHeaderAndFooter{
        constructor(){
            this.loadHeader();
            this.loadFooter();
        }
        loadHeader(){
            $("header").load('/html/include/header.html')
        }

        loadFooter(){
           $("footer").load('/html/include/footer.html')
        }

    }
           return new LoadHeaderAndFooter()
})