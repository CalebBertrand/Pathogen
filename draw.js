void draw(){
	pushMatrix();
	translate(width/2-player.pos.x, width/2-player.pos.y);
	m.run();
	particles.runParticles();
	cells.run();
	popMatrix();
	player.stats();
 };
 void mouseMoved() {
 	player.control();
 }