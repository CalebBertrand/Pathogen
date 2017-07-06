function seventhHeight() {
	$('.seventh-height').each(function() {
  		var windowHeight = $(window).innerHeight();
  		$(this).height(windowHeight/7);
	});
}
function centered() {
	$('.centered').each(function() {
  		var windowWidth = $(window).innerWidth();
  		var elemWidth = $(this).outerWidth();
  		$(this).css('left', windowWidth/2-elemWidth/2);
	});
}
function setupTriangles() {
	var height = $('header').innerHeight();
	var width = $('header').innerWidth()/12;
	$('.triangle-top-left').css({'border-top-width': height, 'border-right-width': width});
	$('.triangle-top-right').css({'border-top-width': height, 'border-left-width': width});
}

centered();
tenthHeight();
setupTriangles();

$(window).resize(function() {
	tenthHeight();
	centered();
	setupTriangles();
});