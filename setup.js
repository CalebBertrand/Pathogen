// new p5();
// var backgroundImg;
// function preload() {
//   backgroundImg = loadImage("imgs/background.png");
// }
// var pressStart;
// var vignette;
// function preload() {
//   pressStart = loadFont('fonts/PressStart2P-Regular.ttf');
// 	vignette = loadImage("imgs/vignette.png");
// }

var particles;
var pathogens;
var p1;
var leukocytes;
function setup() {
	var ctx = createCanvas(window.innerWidth, window.innerHeight);
	ctx.parent('canvas-container');
	particles = createParticles();
	p1 = new player(calRandomPos(25).x, calRandomPos(25).y, 30, 1);
	pathogens = createPahtogens();
	pathogens.push(p1);
	leukocytes = createLeukocytes();
	background(200, 10, 10);
}