var leukocyte = function(X, Y, S, Func, Eats, DoAlways, Counter) {
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
	if (this.foundTarget) {
		var d = p5.Vector.sub(this.pos, this.target.pos);
		if (d.mag() < this.range) {
			this.doOnFind();
		}else{
			this.foundTarget = false;
			this.target = undefined;
		}
	}
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
//used for leucocytes that sound the alarm when they find a pathogenic cell (Basophils)
leukocyte.prototype.alarm = function() {

};
leukocyte.prototype.basophilSeek = function(timestamp) {
	this.counter++;
	if (this.counter % 250 > 200) {
		var alpha = 1/(this.counter % 250 -200)
		push();
		translate(this.pos.x, this.pos.y);
		rotate(frameCount / 100);

		fill(89, 255, 0, map(alpha, 0, 1, 0, 255));
		noStroke();	
		rect(0, -2.5, 100, 5);

		var grd = drawingContext.createRadialGradient(0, 0, 5, 0, 0, 100);
		grd.addColorStop(0.85, "rgba(89, 255, 0, 0)");
		grd.addColorStop(1, "rgba(89, 255, 0, " + alpha + ")");
		//draw circle
		drawingContext.beginPath();
		drawingContext.arc(0, 0, 100, 0, 2 * Math.PI);
		// Fill with gradient
		drawingContext.fillStyle = grd;
		drawingContext.fill();
		pop();
	}
};