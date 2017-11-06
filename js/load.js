// load.js

var load = {
    preload: function() {
        game.load.image('logo', 'assets/logo.png');
    },

    create: function() {
        game.stage.backgroundColor = "#000000";

        var sprite = game.add.button(game.world.centerX, game.world.centerY, 'logo', this.startgame, this);

        sprite.anchor.setTo(0.5, 0.5);
        sprite.alpha = 0;

        game.add.tween(sprite).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

    },    

    startgame: function(){
        
        this.game.state.start("mainMenu");
    }
}