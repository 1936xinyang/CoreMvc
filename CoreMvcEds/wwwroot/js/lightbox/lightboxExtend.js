var degIndex = 3; //1,3代表是上下的；0，2代表是左右的

$(function () {

    /* 把放大缩小按钮取消 */
    setInterval(function () {
        $('.jquery-lightbox-button-max').hide();
    }, 100);

    $(".jquery-lightbox-move").each(function () {
        drag(this);
    });

    /* 图片切换后设置为0，滚动设置为1 */
    var index = 0;

    /*滚动开始时的图片宽高*/
    var imgWidth_Old = 0;
    var imgHeight_Old = 0;

    //浏览器可视区域的宽和高
    var w = document.documentElement.clientWidth
        || document.body.clientWidth;
    var h = document.documentElement.clientHeight
        || document.body.clientHeight;

    /*切换图片后设置index及让jquery-lightbox-move的宽度重新与jquery-lightbox-button-left一致*/
    $('.jquery-lightbox-button-right,.jquery-lightbox-button-left').click(function () {
        index = 0;
        setInterval(function () {
            $('.jquery-lightbox-move').width($('.jquery-lightbox-mode-image').width() + 'px');
            $('.jquery-lightbox-move').height($('.jquery-lightbox-mode-image').height() + 'px');
        }, 1000);
    });

    $('.lightbox').click(function () {
        setInterval(function () {
            $('.jquery-lightbox-move').width($('.jquery-lightbox-mode-image').width() + 'px');
            $('.jquery-lightbox-move').height($('.jquery-lightbox-mode-image').height() + 'px');
        }, 1000);
    });

    /*图片点击之后旋转*/
    $('.jquery-lightbox-background').click(function (e) {
        //rotate($(this).parent().parent());
    });
    $('.jquery-lightbox-background').bind('contextmenu', function (e) {
        //alert(e.which);
        rotate($(this).parent().parent());
        return false;
    })
    /*关闭按钮让图片恢复正常显示*/
    $('.jquery-lightbox-button-close').click(function () {
        rotate($(this).parent().parent(), 0);
        $('.jquery-lightbox-background').css('left', '7px');
        $('.jquery-lightbox-background').css('top', '7px');
    });

    /*双击关闭弹出层*/
    $('.jquery-lightbox-background').dblclick(function () {
        $('.jquery-lightbox-button-close').click();
    });


    /***********************
       * 函数：判断滚轮滚动方向
       * 作者：walkingp
       * 参数：event
       * 返回：滚轮方向 1：向上 -1：向下
      *************************/
    var scrollFunc = function (e) {
        e = e || window.event;
        if (!$('.jquery-lightbox-move .jquery-lightbox-background').html() == "") {

            //图片的宽度
            var imgWidth = $('.jquery-lightbox-move .jquery-lightbox-background').width();
            var imgHeight = $('.jquery-lightbox-move .jquery-lightbox-background').height();
            if (index == 0) {
                imgWidth_Old = imgWidth;
                imgHeight_Old = imgHeight;
                index = 1;
            }

            var lightboxLeft = $('.jquery-lightbox-move').css("left");
            var lightboxTop = $('.jquery-lightbox-move').css("top");

            var parentWidth = $('.jquery-lightbox-mode-image').width();
            var parentHeight = $('.jquery-lightbox-mode-image').height();

            var lightboxWidth = $('.jquery-lightbox-mode-image').width();
            var lightboxHeight = $('.jquery-lightbox-mode-image').height();

            //alert($('.jquery-lightbox-background').css('left'));
            //alert($('.jquery-lightbox-background').css('top'));
            $('.jquery-lightbox-background').css('left', '7px');
            $('.jquery-lightbox-background').css('top', '7px');

            //$('.jquery-lightbox-move').css('left', (w - parentWidth) / 2 + 'px');
            //$('.jquery-lightbox-move').css('top', (h - parentHeight) / 2 + 'px');

            if (e.wheelDelta) {//IE/Opera/Chrome
                if (e.wheelDelta < 0) {
                    //alert('下');
                    //上下颠倒放大
                    if (degIndex == 1 || degIndex == 3) {
                        OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                        OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);
                        //if (lightboxWidth <= w - 10) {
                        //    OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                        //}
                        //if (lightboxHeight <= (h - 10)) {
                        //    OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);

                        //}
                        setCloseLocation();
                    } else { //左右颠倒放大
                        OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                        OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);
                        //if (lightboxWidth <= h - 10) {
                        //    OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                        //}
                        //if (lightboxHeight <= (w - 10)) {
                        //    OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);
                        //}
                        setCloseLocation();
                    }

                } else {
                    //alert('上');
                    if (lightboxWidth >= imgWidth_Old) {
                        OriginalSmallerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                    }
                    if (lightboxHeight >= imgHeight_Old) {
                        OriginalSmallerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);
                    }
                    setCloseLocation();
                }
            } else if (e.detail) {//Firefox
                if (e.detail < 0) {
                    //alert('上');
                    if (lightboxWidth >= imgWidth_Old) {
                        OriginalSmallerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                    }
                    if (lightboxHeight >= imgHeight_Old) {
                        OriginalSmallerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);
                    }
                    setCloseLocation();
                } else {
                    //alert('下');
                    if (degIndex == 1 || degIndex == 3) {
                        if (lightboxWidth <= w - 10) {
                            OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                        }
                        if (lightboxHeight <= (h - 10)) {
                            OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);

                        }
                        setCloseLocation();
                    } else { //左右颠倒放大
                        if (lightboxWidth <= h - 10) {
                            OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft);
                        }
                        if (lightboxHeight <= (w - 10)) {
                            OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop);
                        }
                        setCloseLocation();
                    }
                }
            }


        }


    }
    /*注册事件*/
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);

    }//W3C
    window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome/Safari

    /* 旋转0和180度宽度变大 */
    function OriginalBiggerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft) {
        $('.jquery-lightbox-move .jquery-lightbox-background').width(imgWidth + 10 + "px");
        $('.jquery-lightbox-mode-image').width(parentWidth + 10 + "px");
        $('.jquery-lightbox-move').width(lightboxWidth + 10 + "px");
        $('.jquery-lightbox-move').css("left", parseFloat(lightboxLeft) - 5 + 'px');
    };

    /* 旋转0和180度高度变大 */
    function OriginalBiggerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop) {
        $('.jquery-lightbox-move .jquery-lightbox-background').height(imgHeight + 10 + "px");

        var newHeight = $('.jquery-lightbox-move .jquery-lightbox-background').height();
        $('.jquery-lightbox-html').height(newHeight - 20 + 'px');

        $('.jquery-lightbox-mode-image').height(parentHeight + 10 + "px");
        $('.jquery-lightbox-move').height(lightboxHeight + 10 + "px");
        $('.jquery-lightbox-move').css("top", parseFloat(lightboxTop) - 5 + 'px');
    };

    /* 宽度变小 */
    function OriginalSmallerWidth(imgWidth, parentWidth, lightboxWidth, lightboxLeft) {
        $('.jquery-lightbox-move .jquery-lightbox-background').width(imgWidth - 10 + "px");
        $('.jquery-lightbox-mode-image').width(parentWidth - 10 + "px");
        $('.jquery-lightbox-move').width(lightboxWidth - 10 + "px");
        $('.jquery-lightbox-move').css("left", parseFloat(lightboxLeft) + 5 + 'px');
    };

    /* 高度变小 */
    function OriginalSmallerHeight(imgHeight, parentHeight, lightboxHeight, lightboxTop) {
        $('.jquery-lightbox-move .jquery-lightbox-background').height(imgHeight - 10 + "px");

        var newHeight = $('.jquery-lightbox-move .jquery-lightbox-background').height();
        $('.jquery-lightbox-html').height(newHeight - 20 + 'px');

        $('.jquery-lightbox-mode-image').height(parentHeight - 10 + "px");
        $('.jquery-lightbox-move').height(lightboxHeight - 10 + "px");
        $('.jquery-lightbox-move').css("top", parseFloat(lightboxTop) + 5 + 'px');
    };

    //设置关闭按钮的位置
    function setCloseLocation() {
        $('.jquery-lightbox-button-close').css('right', '12px');
        $('.jquery-lightbox-button-close').css('top', '12px');
    }

    /* 旋转图片begin */
    function getmatrix(a, b, c, d, e, f) {
        var aa = Math.round(180 * Math.asin(a) / Math.PI);
        var bb = Math.round(180 * Math.acos(b) / Math.PI);
        var cc = Math.round(180 * Math.asin(c) / Math.PI);
        var dd = Math.round(180 * Math.acos(d) / Math.PI);
        var deg = 0;
        if (aa == bb || -aa == bb) {
            deg = dd;
        } else if (-aa + bb == 180) {
            deg = 180 + cc;
        } else if (aa + bb == 180) {
            deg = 360 - cc || 360 - dd;
        }
        return deg >= 360 ? 0 : deg;
        //return (aa+','+bb+','+cc+','+dd);
    }
    function rotate(dom, degInfo) {
        var ele = $(dom);
        // console.log(ele.css('transform'))
        var css = ele.css('transform');

        /* 兼容IE9 ↓ */
        var browser = navigator.appName;
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            css = ele.css("-ms-transform");
        };
        /* 兼容IE9 ↑ */

        var deg;
        var step = 90;//每次旋转多少度
        if (degInfo != 0) {
            if (css === 'none') {
                deg = 0;
            } else {
                deg = eval('get' + css);
            }
        }
        else {
            deg = 270;
        }
        var w1 = document.documentElement.clientWidth
            || document.body.clientWidth;
        var h1 = document.documentElement.clientHeight
            || document.body.clientHeight;
        //alert(deg / 90);
        degIndex = deg / 90;
        /* 兼容IE9 */
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            ele.css({ 'msTransform': 'rotate(' + (deg + step) % 360 + 'deg)' });
        } else {
            ele.css({ 'transform': 'rotate(' + (deg + step) % 360 + 'deg)' });
        }

        ele.css({ 'left': (w1 - ele.width()) / 2, 'top': (h1 - ele.height()) / 2 });

        //if (degIndex == 0 || degIndex == 2) {
        //    $(".jquery-lightbox-background").each(function () {
        //        //alert(this);
        //        drag(this);

        //    });
        //}

    }
    /* 旋转图片end  */

    /*图片拖动*/
    function drag(obj) {

        obj.onmousedown = function (ev) {

            var ev = ev || event;


            var disX = ev.clientX - this.offsetLeft;

            var disY = ev.clientY - this.offsetTop;

            if (obj.setCapture) {

                obj.setCapture();

            }

            document.onmousemove = function (ev) {

                var ev = ev || event;

                //if ($('.jquery-lightbox-mode-image').width() > w && $('.jquery-lightbox-mode-image').height() > h) {

                //    obj.style.left = ev.clientX - disX + 'px';

                //    obj.style.top = ev.clientY - disY + 'px';
                //}
                obj.style.left = ev.clientX - disX + 'px';

                obj.style.top = ev.clientY - disY + 'px';


            }

            document.onmouseup = function () {

                document.onmousemove = document.onmouseup = null;

                //释放全局捕获 releaseCapture();

                if (obj.releaseCapture) {

                    obj.releaseCapture();

                }

            }

            return false;

        }

    }


});