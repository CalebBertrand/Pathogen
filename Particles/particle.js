var particle = function(X, Y, C, Kind, Func) {
	this.pos = new PVector(X, Y);
	this.vel = new PVector(0, 0);
	this.accel = new PVector(0, 0);
	this.c = C;
	this.isDead = false;
	this.kind = Kind;
	this.affect = Func;
};
particle.prototype.physics = function() {
	this.vel.add(this.accel);
	this.vel.limit(2);
	this.pos.add(this.vel);
	this.pos.limit(m.radius);
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

	var force = PVector.sub(this.pos, target.pos);
    var distance = force.mag();
    var strength = pow*2 / (distance);
    force.normalize();
    force.mult(strength);
    this.accel.sub(force);
};
particle.prototype.checkForCollision = function(target) {
	var d = PVector.sub(this.pos, target.pos);
	if (d.mag() < target.s) {
		return true;
	}
};
particle.prototype.run = function() {
		var d = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);
		if (d < width/1.5) {
			if (d < player.pm/6 + player.s) {
				if (this.checkForCollision(player)) {
					this.isDead = true;
					player.glucose++;
				}else{
					this.physics();
					this.attract(player, player.pm);
				}
			}
			this.draw();
		}
};

var particles = [];
for (var i = 0; i < 15; i++) {
	particles.push(new particle(sin(random(0, TWO_PI))*random(0, m.radius), cos(random(0, TWO_PI))*random(0, m.radius), color(255, 234, 0), "glucose", function() {
		player.glucose++;
	}));
}