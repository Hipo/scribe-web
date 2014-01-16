(function(e,t,n,r){"use strict";e.fn.animateCSS=function(t,n,r){return this.each(function(){function l(){i.addClass(o+" "+t);if(i.css(u)===f){i.css(u,a)}if(i.is(":"+f)){i.show()}i.bind(s,function(){i.removeClass(o+" "+t);if(typeof r==="function"){r.call(this);i.unbind(s)}})}var i=e(this),s="webkitAnimationEnd oanimationend msAnimationEnd animationend",o="animated",u="visibility",a="visible",f="hidden";if(!n||typeof n==="function"){r=n;l()}else{setTimeout(l,n)}})}})(jQuery,window,document);

if (typeof console == "undefined") {
    this.console = {log: function() {}};
}

var $mb_video =  $("#mb_video");
var $i_video = $("#i_video");
var mb_video = document.getElementById("mb_video")
var i_video = document.getElementById("i_video");

var horizontalSlider;
var horizontalSlider2;
var horizontalSlider3;

var anim = {
	entriPhone : function(){
		$("#iPhone").addClass("inScene");
	},
	entrSection1Bottom : function(){
		$("#section-1-bottom").animateCSS("fadeInDown",function(){
			$(this).css("opacity",1);
		});					
	},
	entrMb : function(){
		$("#MacBook").css('left',"10%");
	},
	exitMb : function(){
/* 		$("#MacBook").css('left',"-10%"); */
	},
	exitiPhone : function(){
		$("#MacBook").css('left',"-50%");
	},
	reset: function(){
		if(!app.isMobile())
		{
			$("#mb-blur").fadeOut();
			app.controlsShown = false;
			$("#iPhone").removeClass("inScene");
			$(".message,#controls").fadeOut();
			mb_video.pause();
			mb_video.currentTime = '0';
			i_video.pause();
			i_video.currentTime = '0';	
		}
	}
}

var app = {
	isMobile:function(){
		return $("#nav").is(":hidden");
	},
	controlsShown:false,
	goToSlide : function(num){
		this.refreshNav(num);
		$.fn.fullpage.moveToSlide(num); 
	},
	refreshNav : function(num){
		$("#nav a").removeClass("selected");
		$("#nav a:nth-child("+num.toString()+")").addClass("selected");
	},
	refreshSlideNav : function(num){
		num+=1;
		$("#section-2 nav a").removeClass("selected");
		$("#section-2 nav a:nth-child("+num.toString()+")").addClass("selected");
	},
	refreshSlideNav2 : function(num){
		num+=1;
		$("#nav-s3 a").removeClass("selected");
		$("#nav-s3 a:nth-child("+num.toString()+")").addClass("selected");
	},
	refreshSlideNav3 : function(num){
		num+=1;
		$("#section-3-desktop nav a").removeClass("selected");
		$("#section-3-desktop nav a:nth-child("+num.toString()+")").addClass("selected");
	}
}

$(window).load(function(){
	$("#curtain").fadeOut(function(){
		$("#logo,nav").addClass("animated");
		setTimeout('anim.entrSection1Bottom()', 1400);
	});
	
	horizontalSlider = $('#slider .bxslider').bxSlider({
		preventDefaultSwipeX : false,
		pager:false,
		controls: false,
		infiniteLoop: false,
		onSlideAfter: function($slideElement, oldIndex, newIndex){
			app.refreshSlideNav(newIndex);
		}
	});
	
	horizontalSlider2 = $('#slider2 .bxslider').bxSlider({
		preventDefaultSwipeX : false,
		pager:false,
		controls: false,
		infiniteLoop: false,
		onSlideAfter: function($slideElement, oldIndex, newIndex){
			app.refreshSlideNav2(newIndex);
		}
	});
	
	horizontalSlider3 = $('#slider3 .bxslider').bxSlider({
		preventDefaultSwipeX : false,
		pager:false,
		controls: false,
		infiniteLoop: false,
		onSlideAfter: function($slideElement, oldIndex, newIndex){
			app.refreshSlideNav3(newIndex);
		}
	});
	
	$("#section-2 nav a").click(function(){
		horizontalSlider.goToSlide($(this).index());
	});
	
	$("#nav-s3 a").click(function(){
		horizontalSlider2.goToSlide($(this).index());
	});

	$("#section-3-desktop nav a").click(function(){
		horizontalSlider3.goToSlide($(this).index());
	});
	
	align_content();
	
});

$(function(){
	//DOM READY
	
	var to_share;
	$(".hova").mouseover(function(){
		$(this).addClass("slideOutUp");
		$(".unter").removeClass("slideOutUp").addClass("slideInDown");
		clearTimeout(to_share);
		to_share = setTimeout('$(".unter").addClass("slideOutUp").removeClass("slideInDown");$(".hova").addClass("slideInDown").removeClass("slideOutUp");', 7000);
	});
	
    $.fn.fullpage({
    	fixedElements: '#logo, #nav',
    	slidesNavigation: false,
    	loopHorizontal: false,
    	css3:true,
    	afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
    		app.refreshSlideNav(slideIndex);
    	},
		afterLoad: function(anchorLink, index){
            app.refreshNav(index);
            if(index == 1)
            {   
            	$("#logo .bg").fadeIn();
				var position = $("#logo-spacer").offset();
			    $("#logo").css({
			        top:position.top
			    });
	            $("#logo").removeClass("scrolled");
	            $("#fader").fadeOut();
	            anim.reset();
            }
            else if(index == 2)
            {
            	$("#logo .bg").fadeIn();
	            $("#MacBook").addClass("fadeInLeftBig");
				setTimeout("mb_video.play()", 1500);
	            if(!$(".bxslider").is(":hidden"))
	            {
		            $("#fader").fadeIn();
	            }
            }
            else if(index == 3)
            {
            	if(app.isMobile())
            		$("#logo .bg").fadeOut();
            	else
	            	$("#logo .bg").fadeIn();
	            $("#fader").fadeOut();
	            anim.reset();
            }
            else if(index == 4)
            {
	            $("#logo .bg").fadeOut();
            }
        },
		onLeave: function(index, direction){
            if(index == '1' && direction =='down'){
                $("#logo").addClass("scrolled");
            }
        }
	});
    
	$mb_video.bind("timeupdate", function() {
	   if(Math.floor(this.currentTime) == 12)
	   {
		   $("#mb-blur").fadeIn(function(){
		   		if(!app.controlsShown)
		   		{
		   			app.controlsShown = true;
				   $("#controls").fadeIn(function(){
						KeyboardJS.on('command + shift + x', function() {
						    $("#try").click();
						}, function() {
						    //do stuff on release
						});
				   });	
		   		}
		   });
	   }
	});
	
	$i_video.bind("timeupdate", function() {
	   if(Math.floor(this.currentTime) == 1)
	   {
		  $("#controls").fadeOut();
	   }
	   else if(Math.floor(this.currentTime) == 5)
	   {
		   $("#msg1").fadeIn();
	   }
	   else if(Math.floor(this.currentTime*10) == 75)
	   {
		  $("#msg1").fadeOut(function(){
			  $("#msg2").fadeIn();
		  });
	   }
	   else if(Math.floor(this.currentTime*10) == 95)
	   {
		  $("#msg2").fadeOut(function(){
			  $("#msg3").fadeIn();
		  });
	   }
	   else if(Math.floor(this.currentTime) == 13)
	   {
		  $("#msg3").fadeOut(function(){$("#msg4").fadeIn();});
		  
		  setTimeout('$("#msg4").fadeOut(function(){$("#msg5").fadeIn();$(".hidden").removeClass("hidden")});', 5000);
		  
	   }
	});
	
	$("#try").click(function(){
		$(this).addClass("animated pulse");
		setTimeout("anim.exitMb();anim.entriPhone();setTimeout('i_video.play();', 1000);", 1000);
	});

	//Navigation Buttons
	$("#nav-1").click(function(){
		app.goToSlide(1);
	});
	$("#nav-2").click(function(){
		app.goToSlide(2);
	});
	$("#nav-3").click(function(){
		app.goToSlide(3); 
	});
	$("#nav-4").click(function(){
		app.goToSlide(4); 
	});
	
/* 	setTimeout('anim.entrMb()', 1200); */
/* 	setTimeout('anim.entriPhone()', 1400); */
	
	//Replay
	$("#msg5").click(function(){
		$("#mb-blur").fadeOut();
		app.controlsShown = false;
		$("#iPhone").removeClass("inScene");
		$(this).fadeOut(function(){
			mb_video.pause();
			mb_video.currentTime = '0';
			i_video.pause();
			i_video.currentTime = '0';
			mb_video.play();
		});
	});
	
	
	$("#a-section2").click(function(){
		app.goToSlide(2);
	});
	
	$("#a-section3").click(function(){
		app.goToSlide(3);
	});
    
    // FETCH SHARE COUNTS
    
    var totalShareCount = 0;
    var shareCountLimit = 50;
    
    $("#ShareCount").hide();
    
    $.getJSON("http://graph.facebook.com/?id=https://www.facebook.com/commandshiftx&callback=?", function(data) {
        if (data.likes != null) {
            totalShareCount += data.likes;

            if (totalShareCount > shareCountLimit) {
                $("#ShareCount").text(totalShareCount).fadeIn("slow");
            }
        }
    });
    
    $.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=http://usescribe.com&callback=?", function(data) {
        if (data.count != null) {
            totalShareCount += data.count;
            
            if (totalShareCount > shareCountLimit) {
                $("#ShareCount").text(totalShareCount).fadeIn("slow");
            }
        }
    });
	
	//OK ALIGN THE CONTENT
	
	//EOF DOM READY
	
});

//SMART RESIZING
var resizeTimer = null;
$(window).resize(function(){
    if (resizeTimer) {
        clearTimeout(resizeTimer);   // clear any previous pending timer
    }
    $("#logo").css("z-index",9999);
    $("#curtain").fadeIn(300);
    resizeTimer = setTimeout(align_content, 1500);   // set new timer
});

//RESIZE FUNCTION
function align_content()
{
	$("#curtain").fadeOut();
	var position = $("#logo-spacer").offset();
    $("#logo").css({
        top:position.top
    });

	//Align content
	$mb_width = $("#mb").outerWidth();
	$mb_height = $("#mb").outerHeight();
	$("#mb").height($mb_height);
	var css = {
		top : $mb_height * 0.0783,
		left : $mb_width * 0.1465,
		width : $mb_width * 0.7128,
		height : $mb_height * 0.7857
	};
	
	horizontalSlider.reloadSlider();
	horizontalSlider2.reloadSlider();
	
	$mb_video.css(css);
	$("#controls, .message").css(css);
	
	$("#MacBook").css("left",(($(window).width()-$mb_width)/2).toString()+"px");
	
	var mb_top = ((($(window).height()-$("#mb").height())/2)-$(window).height()*0.099);
	$("#MacBook").css("top",mb_top.toString()+"px");
	
	var i_top = mb_top - ($("#ip").height() - $mb_height)/2;
	$("#iPhone").css("top",i_top);
	
	
	if($('.bxslider li:visible img').length != 0)
	{	
		var $item = $('.bxslider li:visible img');
		$("#fader").width($item.width());
		$("#fader").height($item.height());
		if($item.offset().top > $(window).height())
		{
			$("#fader").css({top:($item.offset().top - $(window).height()),left:($item.offset().left)});
		}
		else
		{
			$("#fader").css({top:($item.offset().top),left:($item.offset().left)});
		}
	}
	//720 -> 1010 => 0.7128
	//148 -> 1010 => 0.1465
	//45 -> 574 => 0.0783
	//451 -> 574 => 0.7857
	
	/*
		iPhone
		width: 395
		height: 821
		margin-left:37px
		margin-top:119px
		video:
		320 x 570
	*/
	$ip_width = $("#ip").outerWidth();
	$ip_height = $("#ip").outerHeight();
	$i_video.css({
		top : $ip_height * 0.1449,
		left : $ip_width * 0.0936,
		width : $ip_width * 0.8101,
		height : $ip_height * 0.6942
	});
	 

	if(!app.isMobile())
	{
		$("#slider2").hide();
		$("#section-3-desktop").show();
	} 
	else
	{
		$("#slider2").show();
		$("#section-3-desktop").hide();
	}
	
	$(document).on('click touchend', "form button", function () {
		$("form").submit();
	});
	
}

window.addEventListener('orientationchange', align_content);


function alarma(text)
{
	alert(text);
}

var isLocal = function()
{
	if(location.href.match(/localhost/) != null)
		return true;
}