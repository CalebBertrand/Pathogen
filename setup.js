new p5();
// var backgroundImg;
// function preload() {
//   backgroundImg = loadImage("imgs/background.png");
// }
var particles;
var cells;
var p1;
function setup() {
	var ctx = createCanvas(window.innerWidth, window.innerHeight);
	ctx.parent('canvas-container');
	particles = createParticles();
	p1 = new player(0, 0, 2.5, 25, 0.7);
	cells = createCells();
	cells.push(p1);
	frameRate(45);
}