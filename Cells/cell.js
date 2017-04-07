var cell = function(X, Y, velL, S) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.velLimit = velL;
	this.s = S;
};
cell.prototype.physics = function() {
	this.vel.add(this.accel);
	this.vel.limit(this.velLimit);
	this.pos.add(this.vel);
	this.pos.limit(m.radius-this.s);
	this.vel.mult(0.99);
	this.accel.set(0);
};
cell.prototype.run = function() {
	this.physics();
	var d = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);
	if (d < width/1.6) {
		this.draw();
	}
};