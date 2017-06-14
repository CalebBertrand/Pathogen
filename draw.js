function draw() {
	push();
	translate(width/2-p1.pos.x, height/2-p1.pos.y);
	m.run();
	particles.iterateParticles();
	cells.iterate();
	p1.mitosis();
	pop();
	p1.stats();
};
function mouseMoved() {
 	p1.control();
};
function keyReleased() {
	if (keyCode === 70) {
		var fs = fullscreen();
    	fullscreen(!fs);
	}
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}