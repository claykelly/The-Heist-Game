// mainMenu.js

var mainMenu = {
    preload: function() {
        game.load.spritesheet('robber', 'assets/robber_two.png', 32, 48, 18);
    },
    create: function() {
        game.stage.backgroundColor = "#222222"

		var playButton = this.game.add.button(window.innerWidth / 2,window.innerHeight / 2, "robber", this.playTheGame, this);
        playButton.anchor.setTo(0.5,0.5);
        var message = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 + 100, "Click on the robber to start");
        message.anchor.setTo(0.5,0.5);
    },    
    playTheGame: function(){
        this.game.state.start("level1");
    }
}