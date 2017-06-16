var pseudopod = function(YOff, W, H, Parent) {
	this.yOffset = YOff;
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
	this.parent = Parent;
	this.fill = this.parent.fill;
	this.stroke = this.parent.stroke;

};
pseudopod.prototype.update = function() {
	push();
	translate(this.parent.pos.x, this.parent.pos.y);
	rotate(this.r + this.parent.vel.heading() - 90);
	translate(0, this.yOffset);
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

var sarcidine = function(X, Y, S) {
	/* attributes required for this object's prototypes: 

	this.pseudopods = [];
	this.fill = color(255, 233, 178);
	this.stroke = color(247, 210, 116, 200);
	for (var i = 0; i < 5; i++) {
		this.pseudopods.push(new pseudopod(this.size*0.6, this.size, this.size*0.6, this));
	}
	this.rotation = this.vel.heading();
	this.rotateVel = 0;
	this.rotateAccel = 0; */
};
sarcidine.prototype = Object.create(cell.prototype);
sarcidine.prototype = Object.create(bacterium.prototype);
sarcidine.prototype.draw = function() {
	handleRotation(this);
	for (var i = 0; i < floor(this.pseudopods.length/2); i++) {
		this.pseudopods[i].update();
	}
	push();
	fill(this.fill)
	stroke(this.stroke);
	strokeWeight(3.5);
	translate(this.pos.x, this.pos.y);
	rotate(this.rotation);
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
