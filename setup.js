new p5();
var particles;
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	particles = createParticles();
};
function runEvery(frames, func) {
	window.requestAnimationFrame(frames) {
		func();
	};
};