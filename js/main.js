// main.js

// Instantiate the game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'mainDive');

// Add game states
game.state.add("level1", level1);

// create global variables 
var cursors;

// start the the first state
// each state will end by going to another state after this point
game.state.start("level1");