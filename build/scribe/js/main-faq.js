(function(e,t,n,r){"use strict";e.fn.animateCSS=function(t,n,r){return this.each(function(){function l(){i.addClass(o+" "+t);if(i.css(u)===f){i.css(u,a)}if(i.is(":"+f)){i.show()}i.bind(s,function(){i.removeClass(o+" "+t);if(typeof r==="function"){r.call(this);i.unbind(s)}})}var i=e(this),s="webkitAnimationEnd oanimationend msAnimationEnd animationend",o="animated",u="visibility",a="visible",f="hidden";if(!n||typeof n==="function"){r=n;l()}else{setTimeout(l,n)}})}})(jQuery,window,document);

if (typeof console == "undefined") {
    this.console = {log: function() {}};
}

$(function(){
	//DOM READY
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
	
	$(".main-link").click(function(){
		$(".screen1").addClass("section2 answers"+$(this).data("steps"));
        setTimeout("$('.top,.bottom').addClass('fadeOut')",30);
	});
	
	$(".close").click(function(){
        setTimeout("$('.top,.bottom').removeClass('fadeOut')",200);
		$(".screen1").removeClass("section2");
		$(".screen1").removeClass("answers1 answers2");
	});

    var to_share;
    $(".hova").mouseover(function(){
        $(this).addClass("slideOutUp");
        $(".unter").removeClass("slideOutUp").addClass("slideInDown");
        clearTimeout(to_share);
        to_share = setTimeout('$(".unter").addClass("slideOutUp").removeClass("slideInDown");$(".hova").addClass("slideInDown").removeClass("slideOutUp");', 7000);
    });
	
	//OK ALIGN THE CONTENT
	align_content()
	//EOF DOM READY
	
});

//SMART RESIZING
var resizeTimer = null;
$(window).resize(function(){
    if (resizeTimer) {
        clearTimeout(resizeTimer);   // clear any previous pending timer
    }
    resizeTimer = setTimeout(align_content, 300);   // set new timer
});

//RESIZE FUNCTION
function align_content()
{
	var height = $(window).height();
	var s1_height = $(".screen1").outerHeight();
	$(".screen1").css("top",((height-s1_height)/2)+140);
	$("#container").show();
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