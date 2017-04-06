var player = function(X, Y, velL, S, turnSmooth) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.velLimit = velL;
	this.s = S;
	this.isDead = false;
	if (turnSmooth) {
		this.turnSmoothing = turnSmooth;
	}else {
		this.turnSmoothing = 0.8;
	}

	this.hp = 100;
	//plasma membrane
	this.pm = 130;
	//cell wall
	this.cw = 10;
	//ribosomes
	this.ribo = 10;
	//ammount of glucose
	this.glucose = 0;
	//ammount of energy
	this.energy = 0;
	//ammount of chemicals
	this.chem = 0;
};
bacterium.prototype = Object.create(cell.prototype);
bacterium.prototype = Object.create(bacterium.prototype);
player.prototype.control = function() {
		var angle = createVector(mouseX-width/2, mouseY-height/2);
		angle.div(1000);
		angle.mult(angle);
		this.accel.add(angle*this.turnSmoothing);
};
player.prototype.stats = function() {
	if (this.glucose > 0) {
		this.glucose-=0.01;
		this.energy+=0.01;
	}
	push();
	//transparent dark background
	noStroke();
	fill(30, 30, 30, 135);
	rect(0, 0, width, 45);

	//glucose bar
	fill(255, 180, 0);
	rect(0, 0, this.glucose*5, 10);
	//energy bar
	fill(255, map(noise(perlin), 0, 1, 200, 225), 0);
	rect(0, 10, this.energy*3, 10);
	pop();
};

var cells = [];
for (var i = 0; i < 3; i++) {
	cells.push(new bacterium(random(-m.radius/1.5, m.radius/1.5), random(-m.radius/1.5, m.radius/1.5), 2.5, random(20, 60)));
}
var player = new player(0, 0, 2.5, 25, 0.7);
cells.push(player);
