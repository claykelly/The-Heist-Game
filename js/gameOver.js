// gameOver.js

var gameOver = {
    preload: function() {
        game.load.spritesheet('cop', 'assets/cop.png', 32, 48, 18);
        game.load.audio('caughtSound', 'assets/sounds/Well_Done_Clapping.ogg');
        game.load.audio('UISelectionSound', 'assets/sounds/Menu_Selection_Click.wav');
    },
    create: function() {
        game.stage.backgroundColor = "#125ace"

        UISelectionSound = game.add.sound("UISelectionSound");

        music = game.sound.play('caughtSound');

		var playButton = this.game.add.button(window.innerWidth / 2,window.innerHeight / 2, "cop", this.playTheGame, this);
        playButton.anchor.setTo(0.5,0.5);
        var resetMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 + 100, "Click on the Guard to try again.");
        resetMessage.anchor.setTo(0.5,0.5);
        var gameOverMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 100, "You were caught!");
        gameOverMessage.anchor.setTo(0.5,0.5);
    },    
    playTheGame: function(){
        UISelectionSound.play();
        music.stop();
        this.game.cache.removeSound('caughtSound');
        this.game.state.start(game.currentLevel);
    }
}