var leukocyte = function(X, Y, S, Func, Eats, DoAlways, Counter) {
	//physics
	this.pos = createVector(X, Y);
	this.vel = createVector();
	this.accel = p5.Vector.random2D().mult(random(0, 2.5));
	this.accel.mult(5);
	this.s = S;
	this.velLimit = 50 / this.s;
	this.rotation = calRotation(this);

	//presentation
	this.fill = color(255, 233, 178);
	this.stroke = color(247, 210, 116, 200);
	this.pseudopods = [];
	for (var i = 0; i < 5; i++) { this.pseudopods.push(new pseudopod(this.s*0.6, this.s, this.s*0.6, this)); }

	//stats
	this.hp = 100;

	//functionality
	this.foundTarget = false;
	this.doOnFind = Func;
	this.range = this.s + 150;
	this.target = undefined;
	this.eats = Eats;
	this.doAlways = DoAlways;
	//The counter property is used for when there needs to be something unique for each white blood cell that is counted up continuously. See leucocyte.basophilSeek
	this.counter = Counter;
};
leukocyte.prototype = Object.create(sarcidine.prototype);
leukocyte.prototype.update = function() {
	if (this.doAlways) {
		this.doAlways();
	}
};

//only used for white blood cells that will chase the pathogens
leukocyte.prototype.pursue = function() {
	var d = p5.Vector.sub(this.pos, this.target.pos);
	var dis = d.mag();
	if (dis < this.range) {
		if (dis < this.s/2 && this.eats) {
			this.target.hp-=0.5;
		}
		// this.vel.mult(0.35);
		// this.accel.mult(0.35);
    	var distance = d.mag();
    	var strength =  100 / (distance * this.s);
    	d.normalize();
    	d.mult(strength);
    	this.accel.sub(d);
    	if (dis < this.s*1.5) {
			this.target.accel.add(d.mult(15));
		}
	}
};
leukocyte.prototype.neurophilSeek = function() {
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

//used for leucocytes that sound the alarm when they find a pathogenic cell (Basophils)
leukocyte.prototype.alarm = function() {
	nextWave();
};
leukocyte.prototype.basophilSeek = function() {
	var counter = (frameCount + this.counter) % 250;
	if (counter > 205) {
		var alpha = map(counter, 205, 250, 1, 0);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(frameCount / 100);
		drawingContext.globalAlpha = alpha;
		image(radar, -this.range/2, -this.range/2, this.range, this.range);
		pop();
		console.log(this.foundTarget);
		if (!this.foundTarget) {
			for (var i = 0; i < pathogens.length; i++) {
				if (dist(this.pos.x, this.pos.y, pathogens[i].pos.x, pathogens[i].pos.y) < this.range) {
					this.target = pathogens[i];
					this.foundTarget = true;
					this.alarm();
					break;
				}
			}
		}
	}
};