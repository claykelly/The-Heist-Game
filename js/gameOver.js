// gameOver.js

var gameOver = {
    preload: function() {
        game.load.spritesheet('cop', 'assets/cop.png', 32, 48, 18);
    },
    create: function() {
        game.stage.backgroundColor = "#125ace"

		var playButton = this.game.add.button(window.innerWidth / 2,window.innerHeight / 2, "cop", this.playTheGame, this);
        playButton.anchor.setTo(0.5,0.5);
        var resetMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 + 100, "Click on the Guard to try again.");
        resetMessage.anchor.setTo(0.5,0.5);
        var gameOverMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 100, "You were caught!");
        gameOverMessage.anchor.setTo(0.5,0.5);
    },    
    playTheGame: function(){
        this.game.state.start("level1");
    }
}