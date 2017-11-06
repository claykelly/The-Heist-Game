// winScreen.js

var winScreen = {
    preload: function() {
        game.load.spritesheet('robber', 'assets/robber_two.png', 32, 48, 18);
    },
    create: function() {
        game.stage.backgroundColor = "#19963c"

		var playButton = this.game.add.button(window.innerWidth / 2,window.innerHeight / 2, "robber", this.backToMenu, this);
        playButton.anchor.setTo(0.5,0.5);
        var message = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 + 100, "Click on the robber to go back to the main menu.");
        message.anchor.setTo(0.5,0.5);
        var topMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 100, "Congratulations!!! You Win!");
        topMessage.anchor.setTo(0.5,0.5);
    },    
    backToMenu: function(){
        this.game.state.start("mainMenu");
    }
}