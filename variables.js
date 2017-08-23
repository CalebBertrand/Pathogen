var maxBacteriumSize = 100;
var maxWhiteBloodSize = 170;
var perlin = /*random(0, 100)*/ 0;
//the mutation variable starts at a random number. Certain mutations occur if the mutation variable is certain numbers
var mutation = 0;
//enter the number of the mutation and it returns the appropriate message
var mutationMessages = {
	PM:"Your plasma membrane has mutated! Attracting partices may be more difficult."
};
var statsActualPos = [0, 0, 0];
var sideBarIsActive = false;
var statsIsActive = false;
var updateStats = false;
var playerStats;

var mapSize = 850;

var wave = 0;
//LEGEND 
		// B = Basophils
		// N = Neurophils
		// L = Lymphocytes
var waves = [{}, 
			 {B: 3}, 
			 {N: 1},
			 {N: 2 B: 1},
			 {N: 3, L: 1}, 
			 {},
			 {}, 
			 {},
			 {}, 
			 {}
			];
//milliseconds between waves
var waveInterval = 95000;