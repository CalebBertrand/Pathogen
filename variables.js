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