function draw() {
	push();
	translate(width/2-p1.pos.x, height/2-p1.pos.y);
	m.run();
	particles.iterateParticles();
	pathogens.iterate();
	leukocytes.iterate();
	p1.mitosis();
	pop();
};
function mouseMoved() {
	if (!sideBarIsActive) {
		p1.control();
	}
};
function keyReleased() {
	if (keyCode === 70) {
		var fs = fullscreen();
    	fullscreen(!fs);
	}else
	if (keyCode === 49) {
		saveCanvas('pathogenscreenshot','png')
	}else
	if (keyCode === 16) {
		toggleSideBar();
	}
}
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}