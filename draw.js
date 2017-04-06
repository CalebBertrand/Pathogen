function draw() {
	push();
	translate(width/2-player.pos.x, width/2-player.pos.y);
	m.run();
	particles.runParticles();
	cells.run();
	pop();
	player.stats();
};
function mouseMoved() {
 	player.control();
};