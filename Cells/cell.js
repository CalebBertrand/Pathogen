var cell = function(X, Y, S) {
	/* attributes required for this object's prototypes: 
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.velLimit = 2.5;
	this.s = S; */
};
cell.prototype.physics = function() {
	this.vel.add(this.accel);
	this.vel.limit(this.velLimit);
	this.pos.add(this.vel);
	this.pos.limit(m.radius-this.s);
	this.vel.mult(0.99);
	this.accel.set(0);
	this.rotation = calRotation(this);
};
cell.prototype.WBCphysics = function() {
	this.vel.add(this.accel);
	this.vel.limit(this.velLimit);
	this.pos.add(this.vel);
	this.pos.limit(m.radius-this.s);
	this.vel.mult(0.99);
	if (this.pos.mag() > m.radius/2) {
		var pushFromEdge = this.pos.copy();
		pushFromEdge.mult(-0.00002);
		this.accel.add(pushFromEdge);
	}
	this.rotation = calRotation(this);
};

cell.prototype.run = function() {
	if (this.update) {
		this.update();
	}
	if (this.username) {
		this.physics();
	}else {
		this.WBCphysics();
	}
	var d = dist(this.pos.x, this.pos.y, p1.pos.x, p1.pos.y);
	if (d < width/1.6) {
		this.draw();
	}
};