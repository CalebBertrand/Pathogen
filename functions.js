function createPahtogens() {
	var pathogens = [];
	for (var i = 0; i < 3; i++) {
		pathogens.push(new bacterium(calRandomPos('X', 60), calRandomPos('Y', 60), 2.5, random(20, 60)));
	}
	return pathogens;
}
function createLeukocytes() {
	var leukocytes = [];
	leukocytes.push(new leukocyte(0, 0, 100, function() {
		this.pursue();
	}));
	return leukocytes;
}
var leukocytesHunt = setInterval(function() {
		for (var i = 0; i < leukocytes.length; i++) {
			for (var j = 0; j < pathogens.length; j++) {
				var d = p5.Vector.sub(leukocytes[i].pos, pathogens[j].pos);
				
				if (d.mag() < leukocytes[i].range) {
					leukocytes[i].target = pathogens[j];
					leukocytes[i].foundTarget = true;
					break;
				}
			
			}
			if (!leukocytes[i].foundTarget) {
					leukocytes[i].accel.add(p5.Vector.random2D());
			}
		}
	}, 3000);

function handleRotation(obj) {
	obj.rotateAccel = 0;
	obj.rotateVel = constrain(obj.rotateVel, 0, 2.5);
	var rotateForce = (obj.rotation - obj.vel.heading()) / 10;
	obj.rotateAccel+=rotateForce;
	obj.rotateVel+=obj.rotateAcccel;
	obj.rotation+=obj.rotateVel;
}