var flagellum = function(L, Color, Parent) {
	this.leng = L;
	this.points = [];
	this.c = Color;
	this.parent = Parent;
	for (var i = 0; i < this.leng; i++) {
		var x = cos((this.parent.vel.heading()-90) * random(-0.5 * i, 0.5 * i) * this.leng/i;
		var y = sin((this.parent.vel.heading()-90) * random(-0.5 * i, 0.5 * i) * this.leng/i;
		this.points.push(x, y);
	}
};
flagellum.prototype.draw = function() {

};
var bacterium = function(X, Y, velL, S) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.velLimit = velL;
	this.s = S;
	this.isDead = false;
	this.hp = 100;
};
bacterium.prototype = Object.create(cell.prototype);

bacterium.prototype.draw = function() {
	//Blobbiness and plasma membrane
	var p = 0;
	push();
	translate(this.pos.x, this.pos.y);
	rotate(this.vel.heading() - 90);
	strokeWeight(this.s/19);
	stroke(20, 210, 60, 170);
	fill(248, 0, 0);
	beginShape();
	for (var angle = 0; angle < TWO_PI; angle+=TWO_PI/this.s){
		var d = map(noise(p, frameCount/100), 0, 1, this.s*0.75, this.s);
		var x = cos(angle)*d;
		var y = sin(angle)*d;
		vertex(x, y);
		p+=0.1;
	}
	endShape(CLOSE);
	pop();
};

