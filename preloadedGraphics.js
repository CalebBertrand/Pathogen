var mapBackground;
var radar;


function preload() {
	//Radar graphic
	radar = createGraphics(200, 200);
		radar.translate(100, 100);
		radar.fill(89, 255, 0);
		radar.noStroke();	
		radar.rect(0, -2.5, 100, 5);
		var grd = drawingContext.createRadialGradient(0, 0, 5, 0, 0, 100);
		grd.addColorStop(0.85, "rgba(89, 255, 0, 0)");
		grd.addColorStop(1, "rgba(89, 255, 0, 1)");
		//draw circle
		radar.drawingContext.beginPath();
		radar.drawingContext.arc(0, 0, 100, 0, 2 * Math.PI);
		// Fill with gradient
		radar.drawingContext.fillStyle = grd;
		radar.drawingContext.fill();

	mapBackground = createGraphics(mapSize * 3, mapSize * 3);
		mapBackground.background(200, 10, 10);
		mapBackground.translate(mapSize*1.5, mapSize*1.5);
		mapBackground.fill(255, 0, 0);
		mapBackground.strokeWeight(10);
		mapBackground.stroke(190, 30, 30);
		mapBackground.ellipse(0, 0, mapSize*2, mapSize*2);
		//create the gradient with native js
		var grd=drawingContext.createRadialGradient(0,0,mapSize/4,0,0,mapSize/2);
		grd.addColorStop(0,"rgb(255, 41, 30)");
		grd.addColorStop(1,"rgb(255, 0, 0)");
		// Fill with gradient
		mapBackground.drawingContext.fillStyle = grd;
		mapBackground.drawingContext.fillRect(-mapSize/2,-mapSize/2,mapSize,mapSize);
}