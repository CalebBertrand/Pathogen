var particle = function(X, Y, C, Kind, Func) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.c = C;
	this.isDead = false;
	this.kind = Kind;
	this.affect = Func;
};
particle.prototype.physics = function() {
	this.vel.add(this.accel);
	this.vel.limit(2);
	this.pos.add(this.vel);
};
//A simple drawing prototype that creates a circle of the wanted color. Only used if the specific particle has no other drawing methods
particle.prototype.draw = function() {
	fill(this.c);
	noStroke();
	ellipse(this.pos.x, this.pos.y, 6, 6);
};
particle.prototype.attract = function(target, pow) {
	//resets the vel and accel of the particle
	this.vel.mult(0.1);
	this.accel.mult(0.1);

	var force = p5.Vector.sub(this.pos, target.pos);
    var distance = force.mag();
    var strength = pow*2 / (distance);
    force.normalize();
    force.mult(strength);
    if (this.kind === "toxic") {
    	this.accel.add(force.mult(0.1));
    }else {
        this.accel.sub(force);
    }
};
particle.prototype.checkForCollision = function(target) {
	var d = p5.Vector.sub(this.pos, target.pos);
	if (d.mag() < target.s) {
		return true;
	}
};
particle.prototype.run = function() {
		var d = dist(this.pos.x, this.pos.y, p1.pos.x, p1.pos.y);
		if (d < width/1.5) {
			this.pos.limit(m.radius - 20);
			if (d < p1.pm/6 + p1.s) {
				if (this.checkForCollision(p1)) {
					this.isDead = true;
					this.affect();
				}else{
					this.physics();
					this.attract(p1, p1.pm);
				}
			}
			this.draw();
		}
};