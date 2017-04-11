new p5();
var backgroundImg;
function preload() {
  backgroundImg = loadImage("imgs/background.png");
}
var particles;
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	particles = createParticles();
}