/**
 * Created by Administrator on 2015/8/12.
 */
'use strict';
$(function() {
    var CODE_SUCCESS = 0;
    var $param = {
        wp : $(".J_wpList"),
        albums : $(".J_albums"),
        line : $(".line-position"),
        bg : $("#bg"),
        show : $("#show"),
        iAngle : 0,
        audioBtn : $("#audio-btn"),
        music : $("#audo")[0],      //这是音乐元素，不是动作
        langData : ""
    };
    var LIST = {
        init: function() {
            $param.wp.fadeIn();
            this.ajaxLang();
            this.render("albums");
            this.render("wp");
            this.bindEvent();
        },

        ajaxLang:function() {
            var lang = navigator.language || navigator.userLanguage;
            lang = lang.substr(0,2);
            $.get("assets/lang/" + lang + ".txt",function(data) {
                $param.langData = $.parseJSON(data);
                });
        },

        Lang: function() {
                $("span[langkey]").each(function() {
                    $(this).html($param.langData[$(this).attr("langkey")]).removeAttr("langkey");
                });
        },

        //渲染wp和albums页面，公用一个函数
        render: function(module) {
            $.get("assets/modules/" + module + ".php",function(data) {
                var obj = jQuery.parseJSON(data);
                if (obj.code === CODE_SUCCESS) {                       //0表示返回的数据正确
                    $.get("assets/templates/" + module + ".mst",function(template) {
                        var view = Mustache.render(template, obj);
                        if (module === "wp") {
                            $param.wp.prepend(view);
                            LIST.Lang();
                        } else {
                            $param.albums.append(view);
                            LIST.Lang();
                        }
                       // LIST.lang();
                    });
                } else {
                    var mess = $param.langData.error;
                    if (confirm(mess)) {
                        location.reload();
                    }
                }

            })
        },

        fade: function() {
            $param.bg.fadeToggle("500");
            $param.show.fadeToggle("500");
        },

        bindEvent: function() {
            $param.wp.click(function(event) {
                var $e = $(event.target);
                if ($e.is(".wp-image,.wp-image *")) {
                    var sImg = $(this).children().children().attr("src");
                    // sImg = sImg.replace("jpg_720x","jpg_1080x");
                    $("#pic").attr("src", sImg);
                    LIST.fade();
                }
            });
            $param.show.click(function(event) {
                LIST.fade();
            });
            $param.bg.click(function(event) {
                LIST.fade();
            });

            $(".div-bar").click(function(event) {
                var $e = $(event.target);
                if ($e.is("#wp,#wp *")) {
                   // console.log($(this));
                    $param.albums.fadeOut();
                    $param.line.animate({left:"0"});
                    $param.wp.fadeIn();
                } else if ($e.is("#albums,#albums *")) {
                    $param.wp.fadeOut();
                    $param.line.animate({left:"50%"});
                    $param.albums.fadeIn();
                }
            });
            $param.oMusicTime = setInterval(this.rotateImg,50);
            $param.audioBtn.click(function() {
                if ($param.music.paused) {
                    $param.music.play();
                    $param.oMusicTime = setInterval(LIST.rotateImg,50);
                } else {
                    $param.music.pause();
                    clearInterval($param.oMusicTime) ;
                }
            });
        },

        rotateImg:function() {
            $param.iAngle += 3;
            $param.audioBtn.css("transform","rotate(" + $param.iAngle +"deg)");
        }
    };
    LIST.init();
});