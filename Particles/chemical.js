var chemical = function(X, Y, C, Kind, Func) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.c = C;
	this.kind = Kind;
	this.isDead = false;
	this.affect = Func;
};
chemical.prototype = Object.create(particle.prototype);
chemical.prototype.draw = function() {
	noStroke();
	fill(this.c);
	beginShape();
	for (var angle = 0; angle < TWO_PI; angle+=TWO_PI/5){ 
		var x = cos(angle+frameCount/10)*5;
		var y = sin(angle+frameCount/10)*5;
		vertex(x+this.pos.x, y+this.pos.y);
	}
	endShape(CLOSE);
};