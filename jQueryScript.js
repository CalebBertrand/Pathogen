$(".sidebar").hide();
$('.shadow-right').hide();

function seventhHeight() {
	var windowHeight = $(window).innerHeight();
	$('.seventh-height').each(function() {
  		$(this).height(windowHeight/7);
	});
}
// function centered() {
// 	$('.centered').each(function() {
//   		var windowWidth = $(window).innerWidth();
//   		var elemWidth = $(this).outerWidth();
//   		$(this).css('left', windowWidth/2-elemWidth/2);
// 	});
// }
// function setupTriangles() {
// 	var height = $('header').innerHeight();
// 	var width = $('header').innerWidth()/12;
// 	$('.triangle-top-left').css({'border-top-width': height, 'border-right-width': width});
// 	$('.triangle-top-right').css({'border-top-width': height, 'border-left-width': width});
// }
function fullHeight() {
	var windowHeight = $(window).height();
	$('.full-height').each(function() {
  		$(this).height(windowHeight);
	});
}
function toggleSideBar() {
	if (sideBarIsActive) {sideBarIsActive = false; $('.shadow-right').hide(); statsIsActive = false;} else {sideBarIsActive = true; $('.shadow-right').show(); statsIsActive = true;}
  	$(".sidebar").toggle("slide", { direction: "right" }, 250);
}

$( ".toggle-sidebar" ).click(function() {
	toggleSideBar();
});



seventhHeight();
fullHeight();

$(window).resize(function() {
	seventhHeight();
	fullHeight();
});