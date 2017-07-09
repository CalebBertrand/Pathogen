var leukocyte = function(X, Y, S, Func) {
	//physics
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = p5.Vector.random2D();
	this.accel.mult(5);
	this.s = S;
	this.velLimit = 50 / this.s;
	this.rotation = calRotation(this);

	//presentation
	this.fill = color(255, 233, 178);
	this.stroke = color(247, 210, 116, 200);
	this.pseudopods = [];
	for (var i = 0; i < 5; i++) {
		this.pseudopods.push(new pseudopod(this.s*0.6, this.s, this.s*0.6, this));
	}

	//stats
	this.hp = 100;

	//functionality
	this.foundTarget = false;
	this.doOnFind = Func;
	this.range = this.s + 150;
	this.target = undefined;
};
leukocyte.prototype = Object.create(sarcidine.prototype);
leukocyte.prototype.update = function() {
	if (this.foundTarget) {
		var d = p5.Vector.sub(this.pos, this.target.pos);
		if (d.mag() < this.range) {
			this.doOnFind();	
		}else{
			this.foundTarget = false;
			this.target = undefined;
		}
	}
};


//only used for white blood cells that will chase the pathogens
leukocyte.prototype.pursue = function() {
	var d = p5.Vector.sub(this.pos, this.target.pos);
	if (d.mag() < this.range && d.mag() > this.s/2) {
		// this.vel.mult(0.35);
		// this.accel.mult(0.35);
    	var distance = d.mag();
    	var strength =  100 / (distance * this.s);
    	d.normalize();
    	d.mult(strength);
    	this.accel.sub(d);
	}
};