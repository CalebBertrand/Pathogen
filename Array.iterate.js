Array.prototype.iterate = function() {
	for (var i = this.length-1; i >= 0; i--) {
		this[i].run();
		if (this[i].isDead) {
			this.splice(i, 1);
		}
	}
};
//run particles should be used when you want an array to be run that 
//repositions the particles random instead of splicing them, for performance
Array.prototype.iterateParticles = function() {
	for (var i = this.length-1; i >= 0; i--) {
		this[i].run();
		if (this[i].isDead) {
			this[i].pos.set(sin(random(0, TWO_PI))*random(0, m.radius-20), cos(random(0, TWO_PI))*random(0, m.radius-20));
			this[i].isDead = false;
		}
	}
};