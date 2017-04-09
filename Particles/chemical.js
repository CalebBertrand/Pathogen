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

function createParticles() {
	var p = [];
	for (var i = 0; i < 12; i++) {
		p.push(new particle(cos(random(0, TWO_PI))*random(0, m.radius), sin(random(0, TWO_PI))*random(0, m.radius), color(255, 234, 0), "glucose", function() {
			player.glucose++;
		}));
		p.push(new particle(cos(random(0, TWO_PI))*random(0, m.radius), sin(random(0, TWO_PI))*random(0, m.radius), color(36, 229, 68), "toxic", function() {
			player.hp-=2.5;
		}));
		p.push(new chemical(cos(random(0, TWO_PI))*random(0, m.radius), sin(random(0, TWO_PI))*random(0, m.radius), color(196, 93, 193), "chemical", function() {
			player.chem++;
			console.log("yaahoo!!!");
		}));
	}
	return p;
};
