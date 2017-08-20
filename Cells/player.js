//turnSmooth MUST BE DECIMAL EQUAL TO OR LESS THAN 1
var player = function(X, Y, S, turnSmooth, UserName) {
	this.username = UserName;
	//physics
	this.pos = createVector(X, Y);
	this.vel = createVector(0, 0);
	this.accel = createVector();
	this.velLimit = 2.5;
	this.s = S;
	if (turnSmooth) {
		this.turnSmoothing = turnSmooth;
	}else {
		this.turnSmoothing = 0.8;
	}
	this.rotation = calRotation(this);

	//stats
	this.hp = 100;
	this.pm = 130;
	this.cw = 10;
	this.rb = 10;
	this.glucose = 0;
	this.energy = 50;
	this.chem = 15;
	this.isDead = false;
};
player.prototype = Object.create(cell.prototype);
player.prototype = Object.create(bacterium.prototype);
player.prototype.control = function() {
		this.accel.mult(0.2);
		var angle = createVector(mouseX-width/2, mouseY-height/2);
		angle.mult(this.turnSmoothing);
		this.accel.add(angle);
};
// player.prototype.stats = function() {
// 	push();
// 	//transparent dark background
// 	noStroke();
// 	fill(30, 30, 30, 135);
// 	rect(0, 0, width, 50);

// 	//glucose bar
// 	fill(255, 180, 0);
// 	rect(0, 0, this.glucose*5, 10);
// 	//chem bar
// 	fill(196, 93, 193);
// 	rect(0, 10, this.chem*5, 10);
// 	//energy bar
// 	fill(255, map(noise(perlin), 0, 1, 200, 225), 0);
// 	rect(0, 20, this.energy*3, 10);
// 	//health
// 	fill(216, 21, 21);
// 	rect(0, 30, this.hp*3, 10);
// 	pop();

	
// };
// player.prototype.mitosis = function() {
// 	if (this.glucose > 0) {
// 		this.glucose-=0.01;
// 		this.energy+=0.01;
// 	}
// 	if (this.s < 50) {
// 		this.energy-=0.001;
// 		this.s+=0.001;
// 	}else {
// 		this.s = 25;
// 		pathogens.push(new bacterium(this.pos.x, this.pos.y, 25, 40));
// 	}
// };
player.prototype.checkForDead = function() {
	if (this.hp <= 0) {
		this.hp = 100;
		this.pos.set(0, 0);
	}
};