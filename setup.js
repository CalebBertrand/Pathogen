new p5();
var backgroundImg;
function preload() {
  backgroundImg = loadImage("imgs/background.png");
}
var particles;
function setup() {
	var ctx = createCanvas(window.innerWidth, window.innerHeight);
	ctx.parent('canvas-container')
	particles = createParticles();
}