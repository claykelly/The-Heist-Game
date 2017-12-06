// mainMenu.js

var mainMenu = {
    preload: function() {
        game.load.spritesheet('robber', 'assets/robber_two.png', 32, 48, 18);
        game.load.audio('UISelectionSound', 'assets/sounds/Menu_Selection_Click.wav');
    },
    create: function() {
        game.stage.backgroundColor = "#888888"

		var playButton = this.game.add.button(window.innerWidth / 2,window.innerHeight / 2, "robber", this.playTheGame, this);
        playButton.anchor.setTo(0.5,0.5);
        var message = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 + 100, "Click on the robber to start");
        message.anchor.setTo(0.5,0.5);
        var topMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 100, "Collect all of the money in both levels to win.");
        topMessage.anchor.setTo(0.5,0.5);
        var topMessage2 = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 50, "Don't get too close to the guards!");
        topMessage2.anchor.setTo(0.5,0.5);

        UISelectionSound = game.add.sound("UISelectionSound");
    },    
    playTheGame: function(){
        UISelectionSound.play();
        music.stop();
        this.game.cache.removeSound('menuMusic');
        this.game.state.start("level1");
    }
}