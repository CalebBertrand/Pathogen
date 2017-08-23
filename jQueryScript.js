$(".sidebar").hide();
$('.shadow-right').css({'height': '0', 'opacity': '0'});
$('.wave-center').toggle();

function toggleWaveText() {
	$('.wave-number').html(wave+1);
	$('.wave-center').fadeToggle();
}

function seventhHeight() {
	var windowHeight = $(window).innerHeight();
	$('.seventh-height').each(function() {
  		$(this).height(windowHeight/7);
	});
}
function fullHeight() {
	var windowHeight = $(window).height();
	$('.full-height').each(function() {
  		$(this).height(windowHeight);
	});
}
function toggleSideBar() {
	if (sideBarIsActive) {statsOff(); sideBarIsActive = false;} else {statsOn(); sideBarIsActive = true;}
  	$(".sidebar").toggle("slide", { direction: "right" }, 250);
}

$( ".toggle-sidebar" ).click(function() {
	toggleSideBar();
});

seventhHeight();
fullHeight();

$(document).ready(function() {
	$('.username').html(p1.username);
});

$(window).resize(function() {
	seventhHeight();
	fullHeight();
});