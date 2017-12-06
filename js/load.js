// load.js

var load = {
    preload: function() {
        game.load.image('logo', 'assets/logo.png');
        game.load.audio('menuMusic', 'assets/sounds/nebula.ogg');
        game.load.audio('UISelectionSound', 'assets/sounds/Menu_Selection_Click.wav');
    },

    create: function() {
        game.stage.backgroundColor = "#000000";

        var sprite = game.add.button(game.world.centerX, game.world.centerY, 'logo', this.startgame, this);

        sprite.anchor.setTo(0.5, 0.5);
        sprite.alpha = 0;

        game.add.tween(sprite).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        var style = { fill: "#ffffff", align: "center" };
        var message = this.game.add.text(window.innerWidth / 2 - 50,window.innerHeight / 2 - 250, "Click to start", style);

        music = game.add.audio('menuMusic');
        music.play();
        UISelectionSound = game.add.sound("UISelectionSound");

    },    

    startgame: function(){
        
        UISelectionSound.play();
        this.game.state.start("mainMenu");
    }
}