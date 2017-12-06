// main.js

// Instantiate the game
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

// Add game states
game.state.add("load", load);
game.state.add("mainMenu", mainMenu);
game.state.add("gameOver", gameOver);
game.state.add("winScreen", winScreen);
game.state.add("level1", level1);
game.state.add("level2", level2);
game.state.add("level3", level3);


// create global variables 
var cursors;
var music;
game.currentLevel = "level1";

// start the the first state
// each state will end by going to another state after this point
game.state.start("load");