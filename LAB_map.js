var LAB_map = function(R) {
	this.radius = R;
};
LAB_map.prototype.draw = function() {
	background(200, 10, 10);
	fill(255, 0, 0);
	strokeWeight(10);
	stroke(190, 30, 30);
	ellipse(0, 0, this.radius*2, this.radius*2);
	//create the gradient with native js
	var grd=drawingContext.createRadialGradient(0,0,this.radius/4,0,0,this.radius/2);
	grd.addColorStop(0,"rgb(255, 41, 30)");
	grd.addColorStop(1,"rgb(255, 0, 0)");
	// Fill with gradient
	drawingContext.fillStyle = grd;
	drawingContext.fillRect(-this.radius/2,-this.radius/2,this.radius,this.radius);
	//or just show an image instead! (Doesn't seem to help, sadly...)
	//image(backgroundImg, -this.radius/2, -this.radius/2, this.radius, this.radius);
};
LAB_map.prototype.update = function() {
	perlin+=0.01;
	playerStats = [p1.hp, p1.energy, p1.chem];
};
LAB_map.prototype.run = function() {
	this.update();
	this.draw();
};
var m = new LAB_map(600);