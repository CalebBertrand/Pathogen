var whiteblood = function(X, Y, velL, S) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.velLimit = 2.5;
	this.s = S;
	this.isDead = false;
	this.hp = 100;
};
whiteblood.prototype = Object.create(cell.prototype);

bacterium.prototype.draw = function() {
	//Blobbiness and plasma membrane
	var p = 0;
	push();
	translate(this.pos.x, this.pos.y);
	strokeWeight(this.s/19);
	stroke(20, 210, 60, 170);
	fill(248, 0, 0);
	beginShape();
	for (var angle = 0; angle < TWO_PI; angle+=9/this.s){ 
		var d = map(noise(p, frameCount/100), 0, 1, this.s*0.7, this.s);
		var x = cos(angle)*d;
		var y = sin(angle)*d;
		vertex(x, y);
		p+=0.1;
	}
	endShape(CLOSE);
	pop();
};