var pseudopod = function(X, Y, W, H, Fill, Stroke) {
	this.x = X;
	this.y = Y;
	this.w = W;
	this.h = H;
	this.rotateVel = round(random(0, 1));
	if (this.rotateVel === 0) {
		this.rotateVel = 0.005;
		this.destination = HALF_PI;
	}else {
		this.rotateVel = -0.005;
		this.destination = -HALF_PI;
	}
	this.r = random(0, this.destination*1.5);
	this.fill = Fill;
	this.stroke = Stroke;
};
pseudopod.prototype.update = function() {
	push();
	translate(0, 0);
	rotate(this.r);
	translate(this.x, this.y);
	fill(this.fill);
	stroke(this.stroke);
	strokeWeight(3.5);
	var d = abs(this.r - this.destination);
	var h = map(d, 0, HALF_PI, this.h, this.h*0.2);
	beginShape();
	curveVertex(-this.w*1.25,  -h/4);
	curveVertex(-this.w/2, 0);
	curveVertex(0,  h);
	curveVertex(this.w/2,  0);
	curveVertex(this.w*1.25, -h/4);
	endShape();
	this.r += this.rotateVel;
	if (abs(this.r - this.destination*2) < PI/10) {
		this.r = 0;
		this.rotateVel = round(random(0, 1));
		if (this.rotateVel === 0) {
			this.rotateVel = 0.01;
			this.destination = HALF_PI;
		}else {
			this.rotateVel = -0.01;
			this.destination = -HALF_PI;
		}
	}
	pop();
};

var sarcidine = function(X, Y, velL, S) {
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = createVector();
	this.velLimit = velL;
	this.size = S;
	this.pseudopods = [];
	this.fill = color(255, 233, 178);
	this.stroke = color(247, 210, 116, 200);
	for (var i = 0; i < 5; i++) {
		this.pseudopods.push(new pseudopod(0, this.size*0.6, this.size, this.size*0.6, this.fill, this.stroke));
	}
};
sarcidine.prototype = Object.create(cell.prototype);
sarcidine.prototype = Object.create(bacterium.prototype);
sarcidine.prototype.draw = function() {
	for (var i = 0; i < floor(this.pseudopods.length/2); i++) {
		this.pseudopods[i].update();
	}
	push();
	fill(this.fill)
	stroke(this.stroke);
	strokeWeight(3.5);
	translate(this.pos.x, this.pos.y);
	var p = 0;
	beginShape();
	for (var angle = 0; angle < TWO_PI; angle+=TWO_PI/map(this.size, 0, maxWhiteBloodSize, 65, 100)){
		var d = map(noise(p, frameCount/100), 0, 1, this.size*0.75, this.size);
		var x = cos(angle)*d;
		var y = sin(angle)*d;
		vertex(x, y);
		p+=0.1;
	}
	endShape(CLOSE);
	pop();
	for (var i = floor(this.pseudopods.length/2)+1; i < this.pseudopods.length; i++) {
		this.pseudopods[i].update();
	}
};
