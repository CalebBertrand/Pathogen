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
	for (var angle = 0; angle < TWO_PI; angle+=TW0_PI/5){ 
		var x = cos(angle+frameCount/10)*d;
		var y = sin(angle+frameCount/10)*d;
		vertex(x, y);
	}
	endShape(CLOSE);
};

function createParticles() {
	var p = [];
	for (var i = 0; i < 15; i++) {
		p.push(new particle(sin(random(0, TWO_PI))*random(0, m.radius), cos(random(0, TWO_PI))*random(0, m.radius), color(255, 234, 0), "glucose", function() {
			player.glucose++;
		}));
		p.push(new chemical(sin(random(0, TWO_PI))*random(0, m.radius), cos(random(0, TWO_PI))*random(0, m.radius), color(??), "chemical", function() {
			player.chem++;
		}));
	}
	return p;
};
