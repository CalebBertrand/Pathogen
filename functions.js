//runs in setup
function createPahtogens() {
	var pathogens = [];
	// for (var i = 0; i < 3; i++) {
		// pathogens.push(new bacterium(calRandomPos(60).x, calRandomPos(60).y, 2.5, random(20, 60)));
	// }
	return pathogens;
}
//runs in setup
function createLeukocytes() {
	var leukocytes = [];
	//neurophils
	for (var i = 0; i < 0; i++) {
		leukocytes.push(new leukocyte(0, 0, 100, function() {
			this.pursue();
		}, 'N', function() {
			this.neurophilSeek();
		}));
	}
	// 10 is a good max for the basophils
	for (var i = 0; i < 0; i++) {
		leukocytes.push(new leukocyte(0, 0, 45, function() {
			this.alarm();
		}, 'B', function() {
			this.basophilSeek();
		}, random(0, 1000)));
	}	
	return leukocytes;
}
//runs in setup
function createParticles() {
	var p = [];
	for (var i = 0; i < 12; i++) {
		p.push(new particle(calRandomPos(50).x, calRandomPos(50).y, color(255, 234, 0), "glucose", function() {
			p1.glucose++;
		}));
		p.push(new particle(calRandomPos(50).x, calRandomPos(50).y, color(36, 229, 68), "toxic", function() {
			p1.hp-=2.5;
		}));
		p.push(new chemical(calRandomPos(50).x, calRandomPos(50).y, color(196, 93, 193), "chemical", function() {
			p1.chem++;
		}));
	}
	return p;
};
//returns a random position inside the map. Optionally takes a padding between the position and the edge of the map. 
function calRandomPos(offset) {
	var pos = p5.Vector.random2D();
	pos.mult(random(0, m.radius));
	pos.limit(m.radius-offset);
	return pos;
}
//calculate heading according to object's velocity
function calRotation(obj) {
	return obj.vel.heading() - HALF_PI;
}
//stat functions relate to the stat arcs shown in the center of the screen
function toggleStats() {
	// var playerStats = [p1.hp, p1.energy, p1.chem];
	if (statsIsActive) {
		updateStats = false;
		$('.shadow-right').stop().animate({
   			opacity: 0,
   			height: 0,
 		},
		{
			duration: 175,
   			progress: function(a, p, c ) {
      			for (var i = 0; i < statsActualPos.length; i++) {
                    statsActualPos[i] = playerStats[i] * (1 - p);
                }        
   			},
   			complete: function() {
   				statsIsActive = false;
   			}
 		});
	}else{
		statsIsActive = true;
		$('.shadow-right').stop().animate({
   			opacity: 1,
   			height: 40,
 		},
		{
			duration: 175,
   			progress: function(a, p, c ) {
      			for (var i = 0; i < statsActualPos.length; i++) {
                            	statsActualPos[i] = playerStats[i] * p;
                            }
   			},
   			complete: function() {
   				updateStats = true;
   			}
 		});
	}}
function statsOff() {
	if (statsIsActive) {
		// var playerStats = [p1.hp, p1.energy, p1.chem];
		updateStats = false;
		$('.shadow-right').stop().animate({
   				opacity: 0,
   				height: 0,
 			},
			{
			duration: 175,
   			progress: function(a, p, c ) {
   				for (var i = 0; i < statsActualPos.length; i++) {
    	            statsActualPos[i] = playerStats[i] * (1 - p);
    	       }        
   			},
   			complete: function() {
   				statsIsActive = false;
   			}
 		});
	}}
function statsOn() {
	if (!statsIsActive) {
		statsIsActive = true;
		$('.shadow-right').stop().animate({
   			opacity: 1,
   			height: 40,
 		},
		{
			duration: 175,
   			progress: function(a, p, c ) {
      			for (var i = 0; i < statsActualPos.length; i++) {
                            	statsActualPos[i] = playerStats[i] * p;
                            }
   			},
   			complete: function() {
   				updateStats = true;
   			}
 		});
	}}
function drawStats() {
	strokeCap(SQUARE);
	noFill();
	strokeWeight(5);
	stroke(255, 79, 79);
	arc(width/2, height/2, 150, 150, PI*1.5, PI*1.5 + map(statsActualPos[0], 0, 100, 0, HALF_PI));
	stroke(255, 234, 0);
	arc(width/2, height/2, 150 - 9, 150 - 8, PI*1.5, PI*1.5 + map(statsActualPos[1], 0, 100, 0, HALF_PI));
	stroke(196, 93, 193);
	arc(width/2, height/2, 150 - 18, 150 - 16, PI*1.5, PI*1.5 + map(statsActualPos[2], 0, 100, 0, HALF_PI));}
function statsUpdate() {
					for (var i = 0; i < statsActualPos.length; i++) {
						statsActualPos[i] = playerStats[i];
					}}

function isNeurophil(element) {
	if (element.type === 'N') {
		return true;
	}
}
function isBasophil(element) {
	if (element.type === 'B') {
		return true;
	}
}
function isLeukocyte(element) {
	if (element.type === 'L') {
		return true;
	}
}

function nextWave() {
	wave++;
	if (waves[wave]) {
		var n = 0, b = 0, l = 0;
		for (var i = 0; i < leukocytes.length; i++) {
			if (leukocytes[i].type == 'N') n++; else if (leukocytes[i].type == 'B') b++; else if (leukocytes[i].type == 'L') l++;
		}

		var changeN = waves[wave].N - n;
		var changeB = waves[wave].B - b;
		var changeL = waves[wave].L - l;

		if (changeN) {
			if (changeN > 0) {
				for (var i = 0; i < changeN; i++) {
					spawn('N');
				}
			}else if (changeN < 0) {
				for (var i = 0; i < abs(changeN); i++) {
					leukocytes.splice(leukocytes.find(isNeurophil), 1);
				}
			}
		}
		if (changeB) {
			if (changeB > 0) {
				for (var i = 0; i < changeB; i++) {
					spawn('B');
				}
			}else if (changeB < 0) {
				for (var i = 0; i < abs(changeB); i++) {
					leukocytes.splice(leukocytes.find(isBasophil), 1);
				}
			}
		}
		if (changeL) {
			if (changeL > 0) {
				for (var i = 0; i < changeL; i++) {
					spawn('L');
				}
			}else if (changeL < 0) {
				for (var i = 0; i < abs(changeL); i++) {
					leukocytes.splice(leukocytes.find(isLeukocyte), 1);
				}
			}
		}
	}
	toggleWaveText();
	setTimeout(function() {toggleWaveText();}, 4000);
}
//runs each 45 seconds and changes the wave
var autoNextWave = setInterval(function() {nextWave();}, waveInterval);

//functions for WBC's to wander, and also check to find pathogens near them
var neurophilsHunt = setInterval(function() {
		for (var i = 0; i < leukocytes.length; i++) {
			if (leukocytes[i].type == 'N') {
				for (var j = 0; j < pathogens.length; j++) {
					var d = p5.Vector.sub(leukocytes[i].pos, pathogens[j].pos);
					if (d.mag() < leukocytes[i].range) {
						leukocytes[i].target = pathogens[j];
						leukocytes[i].foundTarget = true;
						break;
					}
				}
			}
		}
	}, 5000);
var leukocyteWander = setInterval(function() {
		for (var i = 0; i < leukocytes.length; i++) {
			if (!leukocytes[i].foundTarget) {
					leukocytes[i].accel.mult(0.85);
					leukocytes[i].accel.add(p5.Vector.random2D());
			}
		}
	}, 5000);

//for spawning 1 WBC
function spawn(type, X, Y) {
	var wbctype, x, y;
	if (X && Y) {
		x = X;
		y = Y;
	}else{
		x = 0;
		y = 0;
	}
	if (type == 'B') {
		wbctype = new leukocyte(X, Y, 45, function() {
			this.alarm();
		}, 'B', function() {
			this.basophilSeek();
		}, random(0, 1000));
	}else if (type == 'N') {
		wbctype = new leukocyte(X, Y, 100, function() {
			this.pursue();
		}, 'N', function() {
			this.neurophilSeek();
		});
	}else if (type == 'L') {

	}
	if (wbctype) {
		leukocytes.push(wbctype);
	}
}