var LAB_map = function(R) {
	this.radius = R;
};
LAB_map.prototype.draw = function() {
	background(200, 10, 10);
	fill(255, 0, 0);
	strokeWeight(10);
	stroke(190, 30, 30);
	ellipse(0, 0, this.radius*2, this.radius*2);

	var gradientS = this.radius;
	var grd=ctx.createRadialGradient(75,50,5,90,60,100);
	grd.addColorStop(0,"rgb(255, 41, 30)");
	grd.addColorStop(1,"rgb(255, 0, 0)");

	// Fill with gradient
	drawingContext.fillStyle = grd;
	drawingContext.fillRect(10,10,150,80);
};
LAB_map.prototype.update = function() {
	perlin+=0.01;
};
LAB_map.prototype.run = function() {
	this.update();
	this.draw();
}
var m = new LAB_map(600);