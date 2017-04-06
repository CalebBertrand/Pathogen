function draw() {
	push();
	translate(width/2-player.pos.x, width/2-player.pos.y);
	m.run();
	particles.iterateParticles();
	cells.iterate();
	pop();
	player.stats();
};
function mouseMoved() {
 	player.control();
};