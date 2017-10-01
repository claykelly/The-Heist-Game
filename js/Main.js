// Main.js

// Instantiate the game
var game = new Phaser.Game(800, 600, Phaser.AUTO);

// Add game states
game.state.add("state", state);

var cursors;

// start the the first state
// each state will end by going to another state after this point
game.state.start("state");